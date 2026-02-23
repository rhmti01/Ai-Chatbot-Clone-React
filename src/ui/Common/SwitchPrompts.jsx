import React from "react";

function SwitchPrompts({
  onSwitchPrompt,
  prompsLength,
  activePromptIndex,
  chatPageId,
  messageId,
}) {
  return (
    <div
      className={`  flex items-center space-x-[3px] rounded-2xl 
               text-gray-600 dark:text-gray-300 bg-transparent px-2     `}
    >
      {/* LEFT - back to last response */}
      <button
        disabled={activePromptIndex === 0}
        onClick={() => {
          onSwitchPrompt(chatPageId, messageId, -1);
        }}
        className={`  ${
          activePromptIndex === 0
            ? " text-gray-300 dark:text-gray-600 cursor-auto "
            : "cursor-pointer"
        }   `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" size-[14px] "
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2.5"
            d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
          ></path>
        </svg>
      </button>

      {/* response counter */}
      <p className=" text-[14px] font-medium  ">
        {` ${activePromptIndex + 1} / ${prompsLength} `}
      </p>

      {/* RIGHT - go to furthur response */}
      <button
        disabled={activePromptIndex === prompsLength - 1}
        onClick={() => {
          onSwitchPrompt(chatPageId, messageId, +1);
        }}
        className={`  ${
          activePromptIndex === prompsLength - 1
            ? " text-gray-300 dark:text-gray-600 cursor-auto "
            : "cursor-pointer"
        }   `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" size-[14px] "
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2.5"
            d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default SwitchPrompts;
