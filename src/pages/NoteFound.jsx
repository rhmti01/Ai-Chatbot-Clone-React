import React from "react";
import { useNavigate } from "react-router";

function NoteFound() {
  const navigate = useNavigate();

  return (
    <div className=" inset-0 w-full h-dvh bg-main flex items-center justify-center flex-col pb-16 ">
      <img className=" w-8/12 max-w-xl animate-blurFade " src="/assets/404-Error.png" alt="404 error" />
      <p className=" font-semibold text-gray-900 text-xl text-center " > PAGE NOT FOUND </p>
      <button 
      className=" mt-12 hover:gap-x-4 cursor-pointer inline-flex gap-x-2 px-5 py-2.5 text-[15.5px] duration-700
       bg-indigo-700 ring-2 hover:bg-indigo-600 hover:text-surface text-surface rounded-4xl 
       font-medium shadow-sm "
      onClick={() => navigate("/")}>Return To Home
      </button>
    </div>
  );
}

export default NoteFound;
