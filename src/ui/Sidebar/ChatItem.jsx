import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useGeminiStore } from "../../store/useGeminiStore";
import { useSidebar } from "../../context/SidebarContext";

function ChatItem({ title, id }) {
  const navigate = useNavigate();
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);
  const onDeleteChat = useGeminiStore((state) => state.onDeleteChat);
  const onEditChatTitle = useGeminiStore((state) => state.onEditChatTitle);
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const { setSidebarStatus } = useSidebar();
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setEditMode(false);
        onEditChatTitle(id, editTitle);
      }
    }

    if (editMode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode, editTitle, id, onEditChatTitle]);

  return (
    <>
      <li
        onClick={() => {
          navigate(`/c/${id}`);
          setCurrentChatId(id);
          setSidebarStatus(false);
        }}
        className={`  select-none flex  flex-col justify-center items-start  
          py-0.5 pl-4 cursor-pointer duration-300 w-full group animate-fadeIn-fast   `}
      >
        <div
          className={` ${
            id === currentChatId ? "bg-indigo-50/65 hover:bg-indigo-50/65 " : ""
          }
             flex items-center gap-x-2 relative duration-300
              w-full py-3.5 px-3 rounded-l-full hover:bg-indigo-50/45  `}
        >
          <div
            className={`  ${id === currentChatId ? " right-0 " : " "}
          absolute -right-18 group-hover:right-0 cursor-pointer rounded-l-full
          duration-300 bg-indigo-100/85 flex justify-center items-center
           py-3 w-18 gap-x-2.5
            `}
          >
            {/* remove chat btn */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(id);
                if (currentChatId === id) {
                  navigate("/");
                  setCurrentChatId(null);
                }
              }}
              className=" cursor-pointer "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" size-[17px] hover:text-red-400 text-black duration-300 hover:scale-110 "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {/* edit chat tile btn */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditMode(true);
              }}
              className=" cursor-pointer "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" size-[17px]  hover:stroke-gray-700 stroke-black duration-300 hover:scale-110 "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
                  stroke="stroke-current"
                  strokeWidth="2"
                  strokeminecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z"
                  stroke="stroke-current"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"
                  stroke="stroke-current"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          {/* chat icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={` ${
              (id === currentChatId && !editMode)
                ? "text-indigo-500 hover:text-indigo-500 "
                : "text-black"
            }    
            ${!editMode ? "group-hover:stroke-indigo-500" : ""}
               size-[18px]  duration-300  `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          {/* chat title */}
          {editMode ? (
            <input
              ref={inputRef}
              autoFocus
              onClick={(e)=>e.stopPropagation()}
              onChange={(e) => setEditTitle(e.target.value)}
              className=" text-[15px] font-medium outline-0 ring-0 w-[150px]   "
              type="text"
              value={editTitle}
            />
          ) : (
            <p
              className={`  ${
                id === currentChatId 
                  ? "text-indigo-500 hover:text-indigo-500 "
                  : "text-black"
              }  
           w-[150px] truncate text-[15px] font-medium group-hover:text-indigo-400 duration-300  `}
            >
              {title}
            </p>
          )}
        </div>
      </li>
    </>
  );
}

export default ChatItem;
