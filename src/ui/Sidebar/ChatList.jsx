import React from "react";
import ChatItem from "./ChatItem";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatList() {

   const chatsList = useGeminiStore((state) => state.chatsList);

  return (
    <div className="mt-1 overflow-x-hidden  ">
      <ul className="flex flex-col w-full space-y-0.5 max-h-[calc(100vh-50px)]  bg-amber-500/ ">
          {
            chatsList.map(({headerTitle , id})=>{
              return <ChatItem  key={id} title={headerTitle} id={id} />
            })
          }
      </ul>
    </div>
  );
}
