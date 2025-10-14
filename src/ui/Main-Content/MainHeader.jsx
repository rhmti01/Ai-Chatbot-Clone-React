import React from "react";

export default function MainHeader() {
  return (
    <div className="pt-[35vh] text-center space-y-3">
      <h1
        className="font-semibold px-3 py-1.5 inline-block bg-surface rounded-3xl
         text-md tracking-wider shadow-gray-100 shadow-sm"
      >
        CHAT A.I+
      </h1>
      <p className="tracking-wide font-semibold text-text-primary text-[26px] mx-4 text-center">
        Good Day! How may I assist you today?
      </p>
    </div>
  );
}
