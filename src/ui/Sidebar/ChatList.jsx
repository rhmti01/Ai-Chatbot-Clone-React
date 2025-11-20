import React from "react";
import ChatItem from "./ChatItem";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatList() {

   const chatsList = useGeminiStore((state) => state.chatsList);

  return (
    <div className="mt-1 overflow-x-hidden border-slate-200 border-b-[1px] ">
      <ul className="flex flex-col w-full space-y-0.5 overflow-y-auto [&::-webkit-scrollbar]:w-0 max-h-[calc(50vh-50px)]  bg-amber-500/ ">
          {
            chatsList.map(({headerTitle , id})=>{
              return <ChatItem key={id} title={headerTitle} id={id} />
            })
          }
      </ul>
    </div>
  );
}
