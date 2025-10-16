import React from "react";
import MainHeader from "./MainHeader";
import { useGemini } from "../../context/GeminiContext";

function ChatsSection() {
  const {
    showResults,
    setShowResults,
    loading,
    setLoading,
    setResultData,
    resultData,
    inputPrompt,
    chatScreenMode,
  } = useGemini();

  console.log(inputPrompt);
  console.log(resultData);
  console.log(showResults);
  console.log(chatScreenMode);

  return (
    <div
      className=" h-full flex-1 bg-green-600/ w-full overflow-auto scroll-smooth overflow-y-auto 
       2xl:[&::-webkit-scrollbar]:w-2  2xl:[&::-webkit-scrollbar-track]:rounded-2xl 2xl:[&::-webkit-scrollbar-track]:bg-sub/40
        2xl:[&::-webkit-scrollbar-thumb]:bg-gray-400 2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl "
    >
      {loading && <p>loading.....</p>}
      {chatScreenMode === "starter" ? (
        <MainHeader />
      ) : chatScreenMode === "response" ? (
        <div className="flex flex-col px-6 pt-5 pb-4 text-justify max-w-[720px] mx-auto ">
          <div className=" flex justify-between  items-center gap-x-3 ">
            <img
              className=" size-9 rounded-2xl  "
              src="assets/profile-img.png"
              alt=""
            />
            <p className=" font-medium text-gray-700 flex-1   ">
              {inputPrompt}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" size-[22px] text-gray-600 cursor-pointer "
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div className=" flex items-start  flex-col mt-8 px-3 ">
            <p className=" font-medium   ">
              {resultData}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatsSection;
