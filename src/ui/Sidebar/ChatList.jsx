import React from "react";
import ChatItem from "./ChatItem";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatList() {

   const chatsList = useGeminiStore((state) => state.chatsList);

  return (
    <div className="mt-1 overflow-x-hidden  ">
      <ul className="flex flex-col w-full max-h-[calc(100vh-50px)] duration-300 bg-amber-400/  ">
          {
            chatsList.map(({title , id})=>{
              return <ChatItem  key={id} title={title} id={id} />
            })
          }
      </ul>
    </div>
  );
}
