import React from "react";

function SwitchResponses({
  activeResponseIndex,
  totalResponsesLength,
  chatPageId,
  onSwitchResponse,
  messageId,
  activePromptId,
}) {
  return (
    <div
      className={`   flex items-center space-x-1 rounded-2xl shadow-sm shadow-gray-100
               text-gray-600 bg-surface px-1.5 py-[6px]  `}
    >
      {/* LEFT - back to last response */}
      <button
        disabled={activeResponseIndex === 0}
        onClick={() => {
          onSwitchResponse(chatPageId, messageId, activePromptId, -1);
        }}
        className={`  ${
          activeResponseIndex === 0
            ? " text-gray-300 cursor-auto "
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
        {` ${activeResponseIndex + 1} / ${totalResponsesLength} `}
      </p>

      {/* RIGHT - go to furthur response */}
      <button
        disabled={activeResponseIndex === totalResponsesLength - 1}
        onClick={() => {
          onSwitchResponse(chatPageId, messageId, activePromptId, +1);
        }}
        className={`  ${
          activeResponseIndex === totalResponsesLength - 1
            ? " text-gray-300 cursor-auto "
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

export default SwitchResponses;
