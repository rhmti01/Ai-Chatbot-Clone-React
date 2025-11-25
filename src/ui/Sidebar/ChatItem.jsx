import React from "react";
import { useNavigate } from "react-router";
import { useGeminiStore } from "../../store/useGeminiStore";
import { useSidebar } from "../../context/SidebarContext";

function ChatItem({ title, id  }) {
  const navigate = useNavigate();
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);
  const onDeleteChat = useGeminiStore((state) => state.onDeleteChat);
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const { setSidebarStatus } = useSidebar();

  return (
    <li
      onClick={() => {
        navigate(`/chats/${id}`);
        setCurrentChatId(id);
        setSidebarStatus(false);
      }}
      className={`  ${id===currentChatId ? "text-indigo-600 bg-indigo-50 " : ""} select-none ml-6 mr-8 flex  flex-col justify-center items-start h-12 py-1 bg-gray-100/ cursor-pointer 
      hover:pl-10 overflow-hidden hover:bg-indigo-50/65 rounded-2xl duration-300 group  `}
    >
      <div className="flex items-center gap-x-2 relative bg-green-400/">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDeleteChat(id);
            if (currentChatId === id) {
              setCurrentChatId(null);
              navigate("/chats");
            }
          }}
          className="absolute -left-10 group-hover:left-0 group-hover:-translate-x-10 hover:scale-110 
        duration-300 bg-red-500 py-1.5 pr-2 pl-1 rounded-tr-2xl rounded-br-2xl cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" size-[18px] "
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
              className="stroke-surface"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-[19px] group-hover:stroke-indigo-400 duration-300 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>

        <p className="w-[200px] truncate text-[15px] font-medium group-hover:text-indigo-400 duration-300">
          {title || "Chat Title"}
        </p>
      </div>
    </li>
  );
}

export default ChatItem;
