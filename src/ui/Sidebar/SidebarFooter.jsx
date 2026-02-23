import React, { useEffect, useRef, useState } from "react";
import { useGeminiStore } from "../../store/useGeminiStore";
import useProfileImage from "../../hooks/useProfileImage";
import { useUserStore } from "../../store/useUserStore";

function SidebarFooter() {
  const inputRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const userName = useGeminiStore((state) => state.userName);
  const [nameEditValue, setNameEditValue] = useState(userName);
  const setUserName = useGeminiStore((state) => state.setUserName);
  const profileImage = useUserStore((state) => state.profileImage);
  const { fileInputRef, triggerFileSelect, handleFileChange } =
    useProfileImage();

  // edit new value for user name by ENTER key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      setUserName(nameEditValue);
    }
  };

  // focus on edit mode in input
  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

  // handle outside click for saving new edited chat title
  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setEditMode(false);
        setUserName(nameEditValue);
      }
    }
    if (editMode) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode, nameEditValue, setUserName]);

  return (
    <div
      className="z-10 bg-surface absolute bottom-0 pb-4 pt-3 left-0 right-0
     mx-auto flex-col space-y-3  "
    >
      <div
        className=" w-full max-w-[92%] mx-auto flex items-center justify-start gap-x-2
         p-1.5 rounded-3xl ring-1 ring-gray-200/80 dark:ring-gray-700/85 duration-300 bg-blue-300/ "
      >
        <img
          src={profileImage}
          onClick={triggerFileSelect}
          className="size-10 rounded-full cursor-pointer object-cover"
          alt="user profile"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        {editMode ? (
          <input
            ref={inputRef}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNameEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-[15px] font-medium outline-0 ml-1 ring-0 w-[150px] text-dark "
            type="text"
            value={nameEditValue}
          />
        ) : (
          <p className="text-[14.8px] mx-1 text-dark text-shadow-gray-90  w-[150px] truncate  font-medium duration-300">
            {userName}
          </p>
        )}

        <button
          onClick={() => {
            setEditMode(true);
          }}
          className=" absolute right-8 cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className=" size-5 text-dark "
          >
            <path
              d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SidebarFooter;
