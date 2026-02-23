import React from "react";

function RegenerateResponseBtn({
    onRegenerateResponse,
    chatPageId,
    messageId,
    promptText,
    promptId,
}) {
  return (
    <button
      onClick={() => {
        onRegenerateResponse(chatPageId, messageId, promptText, promptId);
      }}
      className={`  scale-95 md:scale-100  hover:scale-105  px-2 py-[5px]  hover:shadow-sm duration-300 bg-surface shadow-gray-100 dark:shadow-gray-900
               cursor-pointer rounded-full flex gap-x-1 items-center text-gray-700 dark:text-gray-400 text-[14.5px] font-medium
                disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:shadow-none `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`   size-5 mt-0.5   `}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8.01 14.51c.18.3.4.58.65.83a4.732 4.732 0 006.68 0 4.71 4.71 0 001.32-2.67M7.34 11.33c.14-.98.57-1.92 1.32-2.67a4.732 4.732 0 016.68 0c.26.26.47.54.65.83"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7.82 17.18v-2.67h2.67M16.18 6.82v2.67h-2.67"
        ></path>
      </svg>
      <span className=" hidden sm:block ">Regenerate</span>
    </button>
  );
}

export default RegenerateResponseBtn;
