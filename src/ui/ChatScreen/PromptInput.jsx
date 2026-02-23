import React, { useEffect, useRef, useState } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";
import { useLocation, useNavigate } from "react-router";
import { RESPONSE_MODES } from "../../constants/responseModes";
import {
  Sparkles,
  Briefcase,
  Smile,
  MessageCircle,
  Zap,
  Palette,
  Search,
} from "lucide-react";

const MODE_ICONS = {
  sparkles: Sparkles,
  briefcase: Briefcase,
  smile: Smile,
  "message-circle": MessageCircle,
  zap: Zap,
  palette: Palette,
  search: Search,
};

export default function PromptInput() {
  const navigate = useNavigate();
  const inputText = useGeminiStore((state) => state.inputText);
  const selectedModeId = useGeminiStore((state) => state.selectedResponseMode);
  const selectedMode =
    RESPONSE_MODES.find((m) => m.id === selectedModeId) ?? RESPONSE_MODES[0];
  const setSelectedResponseMode = useGeminiStore(
    (state) => state.setSelectedResponseMode
  );
  const setInputText = useGeminiStore((state) => state.setInputText);
  const onSendPrompt = useGeminiStore((state) => state.onSendPrompt);
  const showResult = useGeminiStore((state) => state.showResult);
  const { pathname } = useLocation();
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const Icon = MODE_ICONS[selectedMode.icon];
  const dropDownRef = useRef(null);

  const [useTextarea, setUseTextarea] = useState(false);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const measureRef = useRef(null);
  const [singleLineHeight, setSingleLineHeight] = useState(0);

  // Real-time check for single-line or multi-line text
  useEffect(() => {
    // If text is empty, use input
    if (!inputText.trim()) {
      setUseTextarea((prev) => (prev ? false : prev));
      return;
    }

    // If text contains newline, use textarea
    if (inputText.includes("\n")) {
      setUseTextarea((prev) => (prev ? prev : true));
      return;
    }

    // Helper function to measure text width
    const measureTextWidth = (text, referenceElement) => {
      if (!referenceElement) return Infinity;

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.whiteSpace = "nowrap";
      const computedStyle = window.getComputedStyle(referenceElement);
      tempDiv.style.fontSize = computedStyle.fontSize;
      tempDiv.style.fontFamily = computedStyle.fontFamily;
      tempDiv.style.padding = computedStyle.padding;
      tempDiv.textContent = text;
      document.body.appendChild(tempDiv);

      const textWidth = tempDiv.offsetWidth;
      document.body.removeChild(tempDiv);

      return textWidth;
    };

    // If in input mode, check if it overflows
    if (!useTextarea && inputRef.current) {
      const textWidth = measureTextWidth(inputText, inputRef.current);
      const inputWidth = inputRef.current.clientWidth;

      if (textWidth > inputWidth) {
        setUseTextarea(true);
      }
    }

    // If in textarea mode, check if it can return to input
    if (
      useTextarea &&
      textareaRef.current &&
      measureRef.current &&
      singleLineHeight > 0
    ) {
      const measureEl = measureRef.current;

      // Check if text is single-line
      measureEl.value = inputText;
      measureEl.style.height = "auto";
      const measuredHeight = measureEl.scrollHeight;

      // If measured height is equal to or less than single-line height
      // and text doesn't contain newline, check if it fits in input
      if (measuredHeight <= singleLineHeight && !inputText.includes("\n")) {
        if (inputRef.current) {
          const textWidth = measureTextWidth(inputText, inputRef.current);
          const inputWidth = inputRef.current.clientWidth;

          if (textWidth <= inputWidth) {
            setUseTextarea(false);
          }
        }
      }
    }
  }, [inputText, useTextarea, singleLineHeight]);

  useEffect(() => {
    if (useTextarea && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [inputText, useTextarea]);

  useEffect(() => {
    if (useTextarea) {
      const el = textareaRef.current;
      if (el) {
        setTimeout(() => {
          el.focus();
          const cursorPos = el.value.length;
          el.setSelectionRange(cursorPos, cursorPos);
          el.scrollTop = el.scrollHeight;
        }, 0);
      }
    } else {
      const el = inputRef.current;
      if (el) {
        setTimeout(() => {
          el.focus();
          const cursorPos = el.value.length;
          el.setSelectionRange(cursorPos, cursorPos);
        }, 0);
      }
    }
  }, [useTextarea]);

  useEffect(() => {
    if (measureRef.current) {
      const el = measureRef.current;
      el.style.height = "auto";
      setSingleLineHeight(el.scrollHeight);
    }
  }, []);

  // manage outside click for response mode dropDown
  useEffect(() => {
    if (!isDropDownOpen) return;

    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  return (
    <div
      className={`${pathname === "/" ? "shadow-xl" : "shadow-sm"}
         animate-moveInBottom animate-delay-xs absolute bottom-3 
      lg:bottom-4 flex flex-col items-center gap-y-1 w-[calc(95.7%-2vw)]
       max-w-[750px] py-1.5 pr-[1px] pl-1.5  rounded-[32px] bg-surface
        shadow-gray-200  focus-within:shadow-[#d8dce0] z-30 
       duration-300 dark:shadow-gray-900 dark:focus-within:shadow-main/70 
       dark:bg-gray-900 dark:shadow-sm dark:focus-within:shadow-md
        `}
    >
      <div
        style={{ position: "absolute", left: "-9999px", visibility: "hidden" }}
      >
        <textarea
          rows={1}
          ref={measureRef}
          className="
        resize-none overflow-hidden break-words max-h-[200px] overflow-y-auto
        outline-none border-0
        text-[15.5px] leading-relaxed
        placeholder:text-[15.5px] placeholder:font-normal placeholder:text-sub
        min-h-[40px] py-2 bg-transparent
        focus:placeholder:text-stone-600/80 dark:placeholder:text-gray-400 
          dark:focus-within:placeholder:text-gray-500 peer duration-300 text-dark 
        "
        ></textarea>
      </div>
      {useTextarea && (
        <textarea
          rows={1}
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What’s on your mind?"
          className="w-[97%] mx-2
        resize-none overflow-hidden break-words max-h-[200px] overflow-y-auto
        outline-none border-0
        text-[15.5px] leading-relaxed
        placeholder:text-[15.5px] placeholder:font-normal placeholder:text-sub
        min-h-[40px] pb-2 bg-transparent pr-4 pl-2 mt-4 
        focus:placeholder:text-stone-600/80 dark:placeholder:text-gray-400 
          dark:focus-within:placeholder:text-gray-500 peer duration-300 text-dark  "
        ></textarea>
      )}

      <div className="flex justify-between items-center p-[1px] w-full  ">
        <div ref={dropDownRef} className="relative">
          {/* change response mode drop down menu */}
          <button
            onClick={() => setDropDownOpen((v) => !v)}
            className={`  
            ${isDropDownOpen ? "ring-2 ring-slate-300 dark:ring-slate-700 " : ""}
            mx-2 px-3 h-10
            flex items-center gap-2
            rounded-3xl hover:ring-2
            hover:ring-slate-300
            dark:hover:ring-slate-700
            transition cursor-pointer
            duration-300
            -translate-x-[3.5px]
            `}
          >
            <Icon className="size-4 text-yellow-400" />

            <div className=" hidden sm:flex flex-col leading-tight text-left ">
              <span className="text-sm font-medium text-dark ">{selectedMode.label}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className={`size-3 transition stroke-dark ${
                isDropDownOpen ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {/* hide/show drop down */}
          <div
            className={`
            ${
              isDropDownOpen
                ? "opacity-100 scale-100 pointer-events-auto animate-blurIn-fast"
                : "opacity-0 scale-100 pointer-events-none animate-blurOut "
            }
            absolute bottom-full z-50 mb-2 w-56
            rounded-2xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 p-1
            transition-all duration-200
          `}
          >
            <ul className="flex flex-col gap-y-0.5 ">
              {RESPONSE_MODES.map((mode) => {
                const ItemIcon = MODE_ICONS[mode.icon];

                return (
                  <li
                    key={mode.id}
                    onClick={() => {
                      setSelectedResponseMode(mode.id);
                      setDropDownOpen(false);
                    }}
                    className={`
                      px-3 py-2 rounded-2xl cursor-pointer
                      hover:bg-indigo-50 dark:hover:bg-gray-950/25
                      flex gap-3 items-center
                      ${selectedModeId === mode.id ? "bg-slate-100 dark:bg-gray-950/40 " : ""}
                    `}
                  >
                    <ItemIcon
                      className={`  ${
                        selectedModeId === mode.id
                          ? "text-indigo-600"
                          : "text-slate-500"
                      } size-4 mt-0.5  `}
                    />

                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          selectedModeId === mode.id
                            ? "text-indigo-600"
                            : "text-slate-800 dark:text-slate-200 "
                        }`}
                      >
                        {mode.label}
                      </span>
                      <span
                        className={`text-xs  ${
                          selectedModeId === mode.id
                            ? "text-indigo-600"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {mode.description}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* main user prompt grabber */}
        {!useTextarea && (
          <input
            ref={inputRef}
            className="flex-1 mx-2 outline-none border-0 placeholder:font-normal placeholder:text-[15.5px] text-[15.5px]
          placeholder:text-sub focus:placeholder:text-stone-600/80 dark:placeholder:text-gray-400 
          dark:focus-within:placeholder:text-gray-500 peer duration-300 text-dark "
            type="text"
            name="prompt-input"
            placeholder="What’s on your mind?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendPrompt(navigate);
              }
            }}
          />
        )}

        {/* call request onSendPrompt */}
        <button
          onClick={() => {
            if (!showResult) {
              onSendPrompt(navigate);
            }
          }}
          className={` ${
            showResult ? "p-4" : "p-3"
          } shadow-indigo-200 dark:shadow-indigo-800 shadow-sm 
           rounded-full bg-primary hover:bg-primary/90   cursor-pointer
            ring-0 border-0 outline-none mr-2 `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`  ${
              showResult ? "hidden" : "size-[22px] fill-none "
            }  `}
          >
            <path
              d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM10.11 13.65l3.58-3.59"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span
            onClick={() => {}}
            className={`  ${
              showResult ? "size-4 block bg-surface rounded-sm " : "hidden"
            } `}
          ></span>
        </button>
      </div>
    </div>
  );
}
