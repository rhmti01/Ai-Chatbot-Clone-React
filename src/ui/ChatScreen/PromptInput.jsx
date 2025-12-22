import React, { useState } from "react";
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

  return (
    <div
      className={`${pathname === "/" ? "shadow-xl" : "shadow-sm"}
         animate-moveInBottom animate-delay-xs absolute bottom-3 
      lg:bottom-4 flex items-center justify-between w-[calc(95.7%-2vw)] max-w-[750px] 
      p-1.5 rounded-[34px] bg-surface shadow-gray-200  focus-within:shadow-[#d8dce0] 
       duration-300 z-30 
        `}
    >
      <div className="relative">
        {/* Button */}
        <button
          onClick={() => setDropDownOpen((v) => !v)}
          className="
            mx-2 px-3 h-10
            flex items-center gap-2
            rounded-3xl
            ring-1 ring-slate-200
            bg-white
            hover:bg-slate-100
            transition cursor-pointer
          "
        >
          <Icon className="size-4 text-slate-600" />

          <div className=" hidden sm:flex flex-col leading-tight text-left ">
            <span className="text-sm font-medium">{selectedMode.label}</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            className={`size-3 transition ${
              isDropDownOpen ? "rotate-180" : ""
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isDropDownOpen && (
          <div
            className="
              absolute z-50 mb-2 bottom-full w-56
              rounded-xl
              bg-white
              shadow-lg
              ring-1 ring-slate-200
              p-1
            "
          >
            <ul className="flex flex-col">
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
                      px-3 py-2 rounded-lg cursor-pointer
                      hover:bg-slate-100
                      flex gap-3 items-center
                      ${selectedModeId === mode.id ? "bg-slate-100" : ""}
                    `}
                  >
                    <ItemIcon
                      className={`  ${
                        selectedModeId === mode.id
                          ? "text-indigo-600"
                          : "text-slate-500"
                      } size-4 mt-0.5   `}
                    />

                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          selectedModeId === mode.id
                            ? "text-indigo-600"
                            : "text-slate-800"
                        }`}
                      >
                        {mode.label}
                      </span>
                      <span
                        className={`text-xs  ${
                          selectedModeId === mode.id
                            ? "text-indigo-600"
                            : "text-slate-500"
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
        )}
      </div>

      <input
        className="  w-full mx-2 outline-none border-0 placeholder:font-normal placeholder:text-[15.5px] text-[15.5px]
          placeholder:text-sub focus:placeholder:text-stone-600/80 peer duration-300"
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

      <button
        onClick={() => {
          // if (showResult) {
          onSendPrompt(navigate);
          // }
        }}
        className={` ${
          showResult ? "p-4" : "p-3"
        } shadow-indigo-200 shadow-md  rounded-full bg-primary hover:bg-indigo-600/90  cursor-pointer ring-0 border-0 outline-none  `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`  ${showResult ? "hidden" : "size-[22px] fill-none"}  `}
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
  );
}
