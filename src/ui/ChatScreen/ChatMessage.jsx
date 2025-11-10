import { useTypeEffect } from "../../utils/useTypeEffect";
import Loader from "../../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRef, useEffect, useState, useMemo } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatMessage({
  id,
  prompt,
  response,
  loading,
  hasAnimated,
}) {
  // refs and store
  const messageRef = useRef();
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const [localAnimation, setLocalAnimation] = useState(false);
  const setMessageAnimated = useGeminiStore(
    (state) => state.setMessageAnimated
  );

  // trigger local animation on mount
  useEffect(() => {
    if (!hasAnimated) {
      setLocalAnimation(true);
      const timeout = setTimeout(() => setLocalAnimation(false),800 );
      return () => clearTimeout(timeout);
    }
  }, [hasAnimated]);

  // type effect
  const typingEffectResponse = useTypeEffect(response || "", 10);

  // decide which text to show
  const displayedText = useMemo(() => {
    return hasAnimated ? response : typingEffectResponse;
  }, [hasAnimated, response, typingEffectResponse]);

  // scroll to the message when mounted
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [prompt]);

  // detect when typing animation ends
  useEffect(() => {
    if (!loading && displayedText === response && !hasAnimated) {
      setMessageAnimated(currentChatId, id);
    }
  }, [
    displayedText,
    loading,
    hasAnimated,
    response,
    id,
    currentChatId,
    setMessageAnimated,
  ]);

  return (
    <div
      ref={messageRef}
      className="flex flex-col px-6 pt-4 bg-amber-500/ text-justify max-w-[720px] mx-auto mt-2 text-[16.5px]"
    >
      {/* User prompt */}
      <div className="flex justify-between items-center gap-x-3">
        <p
          className={`${
            localAnimation ? "animate-blurFade" : ""
          } font-normal text-gray-100 px-3.5 py-2 bg-black/95 rounded-3xl rounded-bl-[6px]`}
        >
          {prompt}
        </p>
      </div>

      {/* AI response */}
      <div className="flex flex-col mt-5 pl-2 pr-2 pb-7 bg-amber-100/">
        <div
          className={`${
            localAnimation ? "animate-moveInLeft animate-delay-xs" : ""
          } flex text-primary gap-x-1.5 items-center`}
        >
          <p className="font-medium italic text-[15px]">CHAT A.I +</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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
          <div className="prose prose-gray max-w-none mt-1 leading-normal font-[500]  mb-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {displayedText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
