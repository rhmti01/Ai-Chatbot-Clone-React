import { useTypeEffect } from "../../utils/useTypeEffect";
import Loader from "../../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRef, useEffect, useState } from "react";

export default function ChatMessage({ prompt, response, loading }) {
  const displayedText = useTypeEffect(response || "", 10);
  const messageRef = useRef();
  const [promptMounted, setPromptMounted] = useState(false);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setPromptMounted(true);
    }
  }, [prompt]);

  useEffect(() => {
    if (promptMounted && !loading && displayedText.length && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [displayedText, loading, promptMounted]);

  return (
    <div
      ref={messageRef}
      className="flex flex-col px-6 pt-4 bg-amber-500/ text-justify max-w-[720px] mx-auto mt-2 text-[16.5px]  "
    >
      {/* User prompt */}
      <div className="flex justify-between items-center gap-x-3">
        <p className="font-normal text-gray-100 px-3.5 py-2 bg-black/95 rounded-3xl rounded-bl-[6px] animate-blurFade">
          {prompt}
        </p>
      </div>

      {/* AI response */}
      <div className="flex flex-col mt-5 pl-2 pr-2  pb-7 bg-amber-100/ ">
        <div className="flex text-primary gap-x-1.5 items-center animate-moveInLeft animate-delay-xs">
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
          <div className="prose prose-gray max-w-none mt-1 leading-normal mb-0 ">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {displayedText || ""}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
