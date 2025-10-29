import React from "react";
import { useNavigate } from "react-router";

function NoteFound() {
  const navigate = useNavigate();

  return (
    <div className=" inset-0 w-full h-dvh bg-main flex items-center justify-center flex-col pb-20 ">
      <img className=" w-8/12 max-w-md " src="assets/404-Error.gif" alt="404 error" />
      <button 
      className=" hover:gap-x-4 cursor-pointer  inline-flex gap-x-2 px-5 py-3 text-[15.5px] duration-300
       bg-indigo-600/90 hover:bg-indigo-600 text-surface rounded-2xl font-medium shadow-sm "
      onClick={() => navigate("/")}>Back To Main Page!
      
      <img className=" size-7 " src="assets/think-emoji.png" alt="🧐"  />
      </button>
    </div>
  );
}

export default NoteFound;
