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
      {/* AI title */}
      <button
        onClick={() => navigate("/")}
        className=" cursor-pointer font-semibold xx:text-2xl text-lg inline-block bg-surface rounded-3xl tracking-wider "
      >
        CHAT A.I+
      </button>

      {/* New chat + search */}
      <div className="flex w-full mt-9 space-x-2">
        <button
          onClick={() => {
            setSidebarStatus(false);
            navigate("/");
            setCurrentChatId(null);
          }}
          className="cursor-pointer w-full py-3 font-light bg-primary hover:bg-indigo-600/90 duration-300 text-surface rounded-4xl inline-flex justify-center items-center gap-x-2 hover:gap-x-4"
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
