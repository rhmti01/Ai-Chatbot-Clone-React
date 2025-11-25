import { useTypeEffect } from "../../utils/useTypeEffect";
import Loader from "../../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRef, useEffect, useState, useMemo } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatMessage({
  id: messageId,
  isLast,
  prompt,
  responseText,
  responseError,
  loading,
  hasAnimated,
  chatPageId,
  messageActions,
  responseId,
}) {
  // refs and states
  const messageRef = useRef();
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const [localAnimation, setLocalAnimation] = useState(false);
  const [displayResponseActions, setDisplayResponseActions] =
    useState(messageActions);

  // store actions
  const setMessageAnimated = useGeminiStore(
    (state) => state.setMessageAnimated
  );
  const onRegenerateResponse = useGeminiStore(
    (state) => state.onRegenerateResponse
  );
  const setMessageActionsDisplay = useGeminiStore(
    (state) => state.setMessageActionsDisplay
  );

  const { displayedTypingText, isFinished } = useTypeEffect(
    responseText || "",
    10,
    hasAnimated // Skip if hasAnimated=true
  );

  // trigger local animation on mount
  useEffect(() => {
    if (!hasAnimated) {
      setLocalAnimation(true);
      const timeout = setTimeout(() => setLocalAnimation(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [hasAnimated]);

  // show/hide response action buttons based on response loading
  useEffect(() => {
    if (isFinished && !loading) {
      // show response actions
      setDisplayResponseActions(true);
      setMessageActionsDisplay(chatPageId, messageId, responseId, true);
    } else {
      // hide  response actions
      setDisplayResponseActions(false);
      setMessageActionsDisplay(chatPageId, messageId, responseId, false);
    }
  }, [
    chatPageId,
    isFinished,
    loading,
    messageId,
    responseId,
    setMessageActionsDisplay,
    hasAnimated,
  ]);

  // decide which text to show
  const displayedText = useMemo(() => {
    return hasAnimated ? responseText : displayedTypingText;
  }, [hasAnimated, responseText, displayedTypingText]);

  // scroll to the message when mounted
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [prompt]);

  // detect when typing animation ends
  useEffect(() => {
    if (!loading && displayedText === responseText && !hasAnimated) {
      setMessageAnimated(currentChatId, messageId, responseId);
    }
  }, [
    displayedText,
    loading,
    hasAnimated,
    responseText,
    messageId,
    currentChatId,
    responseId,
    setMessageAnimated,
  ]);

  return (
    <div
      ref={messageRef}
      className="flex flex-col mt-4 pt-4 text-left max-w-[790px] 
      mx-auto  text-[16.5px] overflow-hidden  bg-amber-50/ "
    >
      {/* User prompt */}
      <div className="px-6 flex justify-between items-center gap-x-3">
        <div className="flex items-center space-x-2 ">
          <img
            className={`    ${
              localAnimation ? "animate-moveInLeft animate-delay-xs" : ""
            }  -translate-x-0.5 size-7 rounded-2xl    `}
            src="/assets/profile-img.png"
            alt="USER-PROFILE"
          />
          <p
            className={`${
              localAnimation ? "animate-moveInLeft  " : ""
            }    font-[400] text-[16px]  text-surface px-3 py-1.5 bg-gray-950 rounded-3xl
             rounded-bl-[6px]   `}
          >
            {prompt}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-[21px] cursor-pointer text-gray-700 hover:text-gray-900 duration-500 "
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
            stroke="currentColor"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* AI response */}
      <div className="flex flex-col mt-3 pl-16 pr-10 pb-7 bg-amber-100/">
        <div
          className={`${
            localAnimation ? "animate-moveInLeft animate-delay-xx " : ""
          } flex text-primary/90 gap-x-1.5 items-center`}
        >
          <p className="font-medium italic text-[13.5px]">CHAT A.I +</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 -rotate-[25deg]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`${
              responseError ? "text-gray-700 " : "prose text-black/95"
            } max-w-none mt-1 leading-normal font-[500] mb-0 text-[16]  `}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {displayedText}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Response Actions */}
      <div
        className={` 
            ${
              displayResponseActions
                ? "flex justify-end w-full px-3 animate-fadeIn-fast "
                : "hidden"
            }
          `}
      >
        <div
          className="  flex items-center justify-between  bg-green-400/ my-4 w-[92%] mr-[2%]
         bg-amber-300/  "
        >
          <div
            className={`$  flex items-center gap-x-3  rounded-2xl shadow-sm shadow-gray-100
               text-gray-600 bg-surface px-3 py-[6px] `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" size-[18px] cursor-pointer text-gray-500 hover:text-indigo-500 "
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m7.48 18.35 3.1 2.4c.4.4 1.3.6 1.9.6h3.8c1.2 0 2.5-.9 2.8-2.1l2.4-7.3c.5-1.4-.4-2.6-1.9-2.6h-4c-.6 0-1.1-.5-1-1.2l.5-3.2c.2-.9-.4-1.9-1.3-2.2-.8-.3-1.8.1-2.2.7l-4.1 6.1"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M2.38 18.35v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" size-[18px] cursor-pointer text-gray-500 hover:text-indigo-500 "
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m16.52 5.65-3.1-2.4c-.4-.4-1.3-.6-1.9-.6h-3.8c-1.2 0-2.5.9-2.8 2.1l-2.4 7.3c-.5 1.4.4 2.6 1.9 2.6h4c.6 0 1.1.5 1 1.2l-.5 3.2c-.2.9.4 1.9 1.3 2.2.8.3 1.8-.1 2.2-.7l4.1-6.1"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M21.62 5.65v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" size-[18px] cursor-pointer text-gray-500 hover:text-indigo-500 "
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9z"
              ></path>
            </svg>
            {}
          </div>
          <button
            onClick={() => {
              onRegenerateResponse(chatPageId, messageId, prompt);
            }}
            className={`   px-3 py-1.5  hover:shadow-sm duration-300 bg-surface shadow-gray-100
               cursor-pointer rounded-full flex gap-x-1.5 items-center text-gray-700 text-[14px] font-medium
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
            Regenerate
          </button>
        </div>
      </div>

      {!isLast && <div className="bg-gray-400/40 h-[0.75px] mt-4  " />}
    </div>
  );
}
