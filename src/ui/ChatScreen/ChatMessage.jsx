import { useTypeEffect } from "../../utils/useTypeEffect";
import Loader from "../../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "rehype-sanitize";
import "katex/dist/katex.min.css";
import { useRef, useEffect, useState, useMemo } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";
import toast from "react-hot-toast";
import CopyResponseBtn from "../CopyResponseBtn";
import SwitchResponses from "../SwitchResponses";
import RegenerateResponseBtn from "../RegenerateResponseBtn";
import SwitchPrompts from "../SwitchPrompts";
import CopyPromptBtn from "../CopyPromptBtn";
import { normalizeLLMOutput } from "../../utils/normalizeLLMOutput";

// default rehype sanitize schema with math tag support
const schema = {
  ...defaultSchema,
  tagNames: [
    ...defaultSchema.tagNames,
    "span",
    "div",
    "math",
    "mi",
    "mn",
    "mo",
    "mrow",
  ],
  attributes: {
    ...defaultSchema.attributes,
    span: ["className", "style"],
    div: ["className"],
  },
};

export default function ChatMessage({
  id: messageId,
  activePromptText,
  activePromptId,
  promptsList,
  activePromptIndex,
  responseText,
  responseError,
  loading,
  hasAnimated,
  chatPageId,
  messageActions,
  responseId,
  activeResponseIndex,
  totalResponsesLength,
  isResponseLiked,
}) {
  // refs and states
  const messageRef = useRef();
  const editRef = useRef();
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const [localAnimation, setLocalAnimation] = useState(false);
  const [isResponseCopied, setResponseCopied] = useState(false);
  const [isPromptCopied, setPromptCopied] = useState(false);
  const [displayResponseActions, setDisplayResponseActions] =
    useState(messageActions);
  const [ActiveEditPrompt, setActiveEditPrompt] = useState(false);
  const [editedPromptValue, setEditedPromptValue] = useState(activePromptText);

  // store actions
  const onRegenerateResponse = useGeminiStore(
    (state) => state.onRegenerateResponse
  );
  const onSwitchResponse = useGeminiStore((state) => state.onSwitchResponse);
  const onSwitchPrompt = useGeminiStore((state) => state.onSwitchPrompt);
  const setMessageAnimated = useGeminiStore(
    (state) => state.setMessageAnimated
  );
  const onToggleResponseLike = useGeminiStore(
    (state) => state.onToggleResponseLike
  );
  const onEditPrompt = useGeminiStore((state) => state.onEditPrompt);

  // response text typing effect on ui
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
    } else {
      // hide  response actions
      setDisplayResponseActions(false);
    }
  }, [chatPageId, isFinished, loading, messageId, responseId, hasAnimated]);

  // decide which text to show
  const displayedText = useMemo(() => {
    return hasAnimated ? responseText : displayedTypingText;
  }, [hasAnimated, responseText, displayedTypingText]);

  // detect when typing animation ends
  useEffect(() => {
    if (!loading && displayedText === responseText && !hasAnimated) {
      setMessageAnimated(currentChatId, messageId, activePromptId, responseId);
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
    activePromptId,
  ]);

  // focus on end of edited  prompt value
  useEffect(() => {
    if (ActiveEditPrompt && editRef.current) {
      const el = editRef.current;
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
    }
  }, [ActiveEditPrompt]);

  return (
    <div
      ref={messageRef}
      data-chat-message
      className="flex flex-col mt-4 pt-4 mb-9 text-left max-w-[880px] 
      mx-auto  text-[16.5px] overflow-hidden  bg-amber-500/ "
    >
      {/* User prompt */}
      <div className="px-6 pb-1 flex justify-between items-end gap-x-3 bg-green-500/">
        <div className="flex items-end space-x-2 w-full bg-amber-200/ basis-full ">
          <img
            className={`    ${
              localAnimation ? "animate-moveInLeft animate-delay-xs" : ""
            }  ${
              ActiveEditPrompt ? "  " : "-translate-y-11"
            } -translate-x-0.5  size-7 rounded-2xl  mt-1   `}
            src="/assets/profile-img.png"
            alt="USER-PROFILE"
          />

          {!ActiveEditPrompt ? (
            <div
              className={`  ${
                promptsList.length > 1 ? "  " : " "
              } flex flex-col  bg-blue-400/  gap-y-0.5 group  `}
            >
              <p
                className={`${
                  localAnimation ? "animate-moveInLeft  " : ""
                }  font-[400] text-[16px]  text-surface px-3 py-1.5 bg-gray-950 rounded-3xl 
             rounded-bl-[6px]   max-w-[360px] md:max-w-[480px] xl:max-w-[560px]   `}
              >
                {activePromptText}
              </p>
              <div
                className={`  ${
                  localAnimation ? "animate-moveInLeft  " : ""
                }  opacity-0 group-hover:opacity-100 flex gap-x-1 pl-1 py-[7px] mb-[8px] duration-500  `}
              >
                <CopyPromptBtn
                  promptText={activePromptText}
                  setPromptCopied={setPromptCopied}
                  isPromptCopied={isPromptCopied}
                />
                {promptsList.length > 1 && (
                  <SwitchPrompts
                    prompsLength={promptsList.length}
                    activePromptIndex={activePromptIndex}
                    chatPageId={chatPageId}
                    messageId={messageId}
                    onSwitchPrompt={onSwitchPrompt}
                  />
                )}
              </div>
            </div>
          ) : (
            <div
              className="bg-gray-200 rounded-3xl shadow-sm shadow-gray-100
              w-full flex flex-col gap-y-6 p-4 animate-fadeIn-fast h-full "
            >
              <textarea
                ref={editRef}
                autoFocus
                onChange={(e) => {
                  const v = e.target.value;
                  setEditedPromptValue(v);
                  e.target.style.height = "auto";
                  const maxHeight = 200;
                  const newHeight = Math.min(e.target.scrollHeight, maxHeight);
                  e.target.style.height = `${newHeight}px`;
                }}
                value={editedPromptValue}
                className={`
                    px-2 outline-0 resize-none w-full break-words overflow-y-auto
                    ${
                      editedPromptValue.split("\n").length >= 3 ||
                      editedPromptValue.length > 80
                        ? "min-h-[140px]"
                        : "min-h-[60px]"
                    }
                  `}
                name="edit-prompt"
              />

              {/* edit prompt actions */}
              <div className="flex w-full justify-end gap-x-2 items-center">
                <button
                  onClick={() => setActiveEditPrompt(false)}
                  className="text-surface bg-gray-600 px-3 py-1
                rounded-3xl cursor-pointer duration-300 text-[14px] hover:bg-gray-600/85"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!editedPromptValue.trim()) {
                      toast.error("Prompt cannot be empty");
                      return;
                    } else if (editedPromptValue === activePromptText) {
                      toast.error("No changes made to the prompt");
                      return;
                    }
                    setActiveEditPrompt(false);
                    onEditPrompt(chatPageId, messageId, editedPromptValue);
                  }}
                  className="text-surface bg-indigo-600 px-3 py-1
                rounded-3xl cursor-pointer duration-300 text-[14px] hover:bg-indigo-600/85"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* edit prompt  */}
        <button
          onClick={() => {
            if (!loading) setActiveEditPrompt(true);
          }}
          className={` ${localAnimation ? "animate-moveInRight" : ""} 
          ${!ActiveEditPrompt ? " block " : " hidden "}
          basis-6 bg-amber-500/ -translate-y-14  duration-300 hover:scale-105 cursor-pointer  `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-[21px]  text-gray-700 hover:text-gray-900 duration-500 "
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
        </button>
      </div>

      {/* AI response */}
      <div
        className={`  ${
          promptsList.length > 1 ? "" : ""
        }  flex flex-col  pl-16 pr-10 pb-7 bg-amber-100/   `}
      >
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
            } font-outfit max-w-none mt-1 leading-normal font-[500] mb-0 text-[16]  `}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeSanitize, schema]]}
            >
              {normalizeLLMOutput(displayedText)}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Response Actions */}
      <div
        className={` 
            ${
              displayResponseActions
                ? "flex justify-center items-center px-3  w-full  animate-fadeIn-fast bg-green-400/  "
                : "hidden"
            }
          `}
      >
        <div
          className="  flex items-center justify-between gap-x-3 bg-green-900/ my-4 w-[92%] translate-x-[2%]
         bg-amber-300/  "
        >
          <div className="flex justify-center items-center gap-x-5 bg-red-400/ ">
            {/* message like and copy btns  */}
            <div
              className={`$  flex items-center  gap-x-3  rounded-2xl shadow-sm shadow-gray-100
               text-gray-600 bg-surface px-3 py-[7.5px] `}
            >
              {/* like response */}
              <button
                className=" cursor-pointer hover:scale-105 duration-300 "
                onClick={() => {
                  onToggleResponseLike(
                    chatPageId,
                    messageId,
                    activePromptId,
                    responseId,
                    true
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`  ${
                    isResponseLiked === true
                      ? " text-indigo-600   "
                      : "text-gray-500 hover:text-indigo-400  "
                  } 
                 duration-300 size-[18px] cursor-pointer  `}
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
              </button>
              <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>
              {/* dislike response */}
              <button
                className=" cursor-pointer hover:scale-105 duration-300 "
                onClick={() => {
                  onToggleResponseLike(
                    chatPageId,
                    messageId,
                    activePromptId,
                    responseId,
                    false
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`  ${
                    isResponseLiked === false
                      ? " text-indigo-600   "
                      : "text-gray-500 hover:text-indigo-400  "
                  } 
                 duration-300 size-[18px] cursor-pointer  `}
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
              </button>
              <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>

              {/* copy response text */}
              <CopyResponseBtn
                responseText={responseText}
                setResponseCopied={setResponseCopied}
                isResponseCopied={isResponseCopied}
              />
            </div>

            {/* regenerated response switch */}
            {totalResponsesLength > 1 && (
              <SwitchResponses
                chatPageId={chatPageId}
                messageId={messageId}
                activePromptId={activePromptId}
                activeResponseIndex={activeResponseIndex}
                totalResponsesLength={totalResponsesLength}
                onSwitchResponse={onSwitchResponse}
              />
            )}
          </div>

          {/* regenerate action button */}
          <RegenerateResponseBtn
            onRegenerateResponse={onRegenerateResponse}
            chatPageId={chatPageId}
            messageId={messageId}
            promptText={activePromptText}
            promptId={activePromptId}
          />
        </div>
      </div>
    </div>
  );
}
