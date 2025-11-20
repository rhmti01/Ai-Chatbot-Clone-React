import { useTypeEffect } from "../../utils/useTypeEffect";
import Loader from "../../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRef, useEffect, useState, useMemo } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";
import { Copy, Dislike, Edit, Like1, RefreshCircle } from "iconsax-reactjs";

export default function ChatMessage({
  id,
  isLast,
  prompt,
  responseText,
  responseError,
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
      const timeout = setTimeout(() => setLocalAnimation(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [hasAnimated]);

  // type effect
  const typingEffectResponse = useTypeEffect(responseText || "", 10);

  // decide which text to show
  const displayedText = useMemo(() => {
    return hasAnimated ? responseText : typingEffectResponse;
  }, [hasAnimated, responseText, typingEffectResponse]);

  // scroll to the message when mounted
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [prompt]);

  // detect when typing animation ends
  useEffect(() => {
    if (!loading && displayedText === responseText && !hasAnimated) {
      setMessageAnimated(currentChatId, id);
    }
  }, [
    displayedText,
    loading,
    hasAnimated,
    responseText,
    id,
    currentChatId,
    setMessageAnimated,
  ]);

  return (
    <div
      ref={messageRef}
      className="flex flex-col mt-4 pt-4 text-justify max-w-[790px] 
      mx-auto  text-[16.5px] overflow-x-hidden bg-amber-50/ "
    >
      {/* User prompt */}
      <div className="px-6 flex justify-between items-center gap-x-3">
        <div className="flex items-center space-x-2 ">
          <img
            className=" -translate-x-0.5 size-7 rounded-2xl "
            src="/assets/profile-img.png"
            alt="USER-PROFILE"
          />
          <p
            className={`${
              localAnimation ? "animate-blurFade" : ""
            }  text-gray-700 font-[400] text-[16px]  `}
          >
            {prompt}
          </p>
        </div>
        <Edit className="size-[21px] cursor-pointer text-gray-700 hover:text-gray-900" />
      </div>

      {/* AI response */}
      <div className="flex flex-col mt-3 pl-16 pr-10 pb-7 bg-amber-100/">
        <div
          className={`${
            localAnimation ? "animate-moveInLeft animate-delay-xs" : ""
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
              responseError ? "text-red-600" : "prose text-black/95"
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
      <div className="flex justify-end w-full px-3 ">
        <div className="  flex items-center justify-between  bg-green-400/ my-4 w-[92%] mr-[2%] bg-amber-300/  ">
          <div className= { `${localAnimation ? "animate-moveInLeft animate-delay-xs" : "" } flex items-center gap-x-3  rounded-2xl shadow-sm shadow-gray-100 text-gray-600 bg-gray-50 px-3 py-[6px] `} >
            <Like1 className=" size-[18px] cursor-pointer text-indigo-600 " />
            <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>
            <Dislike className=" size-[18px] cursor-pointer " />
            <span className=" h-4 w-[2px] bg-gray-400/85 rounded-full "></span>
            <Copy className=" size-[18px] cursor-pointer " />
          </div>
          <button
            className= { `${localAnimation ? "animate-moveInRight animate-delay-xs" : "" } px-2.5 py-[6px] shadow-sm hover:shadow-sm duration-300 shadow-gray-100 bg-gray-50  cursor-pointer rounded-full
         flex gap-x-1 items-center text-gray-700/90 text-[14px] font-medium `}  
          >
            <RefreshCircle className=" size-5  " />
            Regenerate
          </button>
        </div>
      </div>

      {!isLast && <div className="bg-gray-400/40 h-[0.75px] mt-4  " />}
    </div>
  );
}
