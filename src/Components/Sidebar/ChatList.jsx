import React from "react";
import ChatItem from "./ChatItem";

export default function ChatList() {
  return (
    <div className="mt-5 overflow-x-hidden">
      <ul className="flex flex-col w-full gap-y-2 overflow-y-visible scroll-ml-0 max-h-[50vh]">
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
      </ul>
    </div>
  );
}
