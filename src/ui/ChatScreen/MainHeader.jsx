import React from "react";

export default function MainHeader() {
  return (
    <div className="  bg-blue-500/ pb-16 absolute w-full top-1/2 -translate-y-1/2  text-center space-y-3   ">
      <h1
        className="font-semibold px-3 py-1.5 inline-block bg-surface  rounded-3xl
         text-md tracking-wider shadow-gray-100 shadow-sm animate-blurBounce "
      >
        CHAT A.I+
      </h1>
      <p className="tracking-wide font-semibold text-text-primary text-[26px] mx-4 text-center animate-blurIn animate-delay-md ">
        Good Day! How may I assist you today?
      </p>
    </div>
  );
}
