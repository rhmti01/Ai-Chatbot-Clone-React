import React from "react";
import MainHeader from "./MainHeader";
import Loader from "../ui/Loader";
import { useGeminiStore } from "../../store/useGeminiStore";

function ChatsSection() {
  // const { showResult, loading , chatsList , chatScreenMode } = useGemini();
  const loading = useGeminiStore((state) => state.loading);
  const chatsList = useGeminiStore((state) => state.chatsList);
  const chatScreenMode = useGeminiStore((state) => state.chatScreenMode);

  console.log(loading);
  console.log(chatsList);

  return (
    <div
      className=" h-full flex-1 bg-green-600/ relative w-full overflow-auto scroll-smooth overflow-y-auto 
       2xl:[&::-webkit-scrollbar]:w-2  2xl:[&::-webkit-scrollbar-track]:rounded-2xl 2xl:[&::-webkit-scrollbar-track]:bg-sub/40
        2xl:[&::-webkit-scrollbar-thumb]:bg-gray-400 2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl "
    >
      {chatScreenMode === "starter" ? (
        <MainHeader />
      ) : chatScreenMode === "response" ? (
        chatsList.map(({ prompt, response, id }) => {
          return (
            <div key={id}
              className="flex flex-col px-6 pt-5 pb-16 text-justify max-w-[720px] mx-auto mt-2 text-[16.5px]  bg-gray-200/"
            >
              <div className=" flex justify-between  items-center gap-x-3 ">
                <p className=" font-normal text-gray-100  px-3.5 py-2  bg-black/95  rounded-3xl rounded-bl-[6px] ">
                  {prompt}
                </p>
              </div>
              <div className=" flex items-start  flex-col mt-5 pl-2 pr-2 ">
                <div className="flex text-primary gap-x-1.5 items-center ">
                  <p className="font-medium italic text-[15px] ">CHAT A.I + </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 -rotate-[25deg]  "
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
                  <div>
                    <p className=" font-semibold text-black mt-1  ">
                      {response}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : null}
    </div>
  );
}

export default ChatsSection;
