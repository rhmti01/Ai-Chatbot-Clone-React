import React from "react";
import { useNavigate } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function SidebarHeader() {
  const navigate = useNavigate();
  const { setSidebarStatus } = useSidebar();
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);

  return (
    <div className="*:px-7 pt-6 flex flex-col items-start">
      <div className=" flex justify-between items-center w-full ">
        {/* App header title */}
        <h1 className=" cursor-pointer font-medium xx:text-2xl text-xl inline-block  rounded-3xl tracking-wider ">
          CHAT A.I+
        </h1>

        <button
        className=" cursor-pointer lg:hidden "
          onClick={() => {
            setSidebarStatus(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 stroke-stone-700 "
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="m9.17 14.83 5.66-5.66M14.83 14.83 9.17 9.17M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
              stroke="stroke-current"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      {/* New chat + search */}
      <div className="flex items-center justify-start w-full mt-8 gap-x-2 ">
        <button
          onClick={() => {
            setSidebarStatus(false);
            navigate("/");
            setCurrentChatId(null);
          }}
          className="cursor-pointer w-full py-3 font-normal bg-primary hover:bg-indigo-600/90 duration-300 text-surface rounded-4xl inline-flex justify-center items-center gap-x-2 hover:gap-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 12h12M12 18V6"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>New Chat</span>
        </button>

        <button
          className="bg-black py-3 px-3.5 rounded-full inline cursor-pointer shadow-xl shadow-gray-200 hover:shadow-gray-400/70 group"
          size=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 group-hover:scale-85 duration-300"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
