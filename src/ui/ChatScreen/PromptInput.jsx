import React from "react";
import { useGeminiStore } from "../../store/useGeminiStore";
import { useNavigate } from "react-router";

export default function PromptInput() {
  const navigate = useNavigate()
  const inputText = useGeminiStore((state) => state.inputText);
  const setInputText = useGeminiStore((state) => state.setInputText);
  const onSendPrompt = useGeminiStore((state) => state.onSendPrompt);
  const showResult = useGeminiStore((state) => state.showResult);


  return (
    <div
      className=" absolute bottom-7 flex items-center justify-between w-[calc(94%-2vw)] max-w-[690px] 
      p-2 rounded-[34px] bg-surface shadow-gray-200 shadow-md focus-within:shadow-[#bfc4ca] focus-within:shadow-lg duration-300 
     "
    >
      <img
        className="size-6 ml-3 mr-0.5"
        src="/assets/brain.png"
        alt="thinking"
      />

      <input
        className="  w-full mx-2 outline-none border-0 placeholder:font-normal
          placeholder:text-sub focus:placeholder:text-stone-600/85 peer duration-300"
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
          onSendPrompt(navigate);
        }}
        className={` ${
          showResult ? "p-4" : "p-3"
        } shadow-indigo-200 shadow-md  rounded-full bg-primary hover:bg-indigo-600/90  cursor-pointer  `}
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
          onClick={() => {
          }}
          className={`  ${
            showResult ? "size-4 block bg-surface rounded-sm " : "hidden"
          } `}
        ></span>
      </button>

    </div>
  );
}
