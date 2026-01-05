import React, { useMemo } from "react";
import ChatItem from "./ChatItem";
import { useGeminiStore } from "../../store/useGeminiStore";

export default function ChatList() {
  const chats = useGeminiStore((state) => state.chatsList);

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      // both pinned
      if (a.pinnedAt && b.pinnedAt) {
        return a.pinnedAt - b.pinnedAt;
      }
      // one chat pinned
      if (a.pinnedAt) return -1;
      if (b.pinnedAt) return 1;
      // no chat is pinned
      return b.createdAt - a.createdAt;
    });
  }, [chats]);

  return (
    <div className="mt-1 overflow-x-hidden   ">
      <ul className="flex flex-col w-full max-h-[calc(100vh-50px)] duration-300 bg-amber-400/  overflow-y-hidden ">
        {sortedChats.map(({ title, hasChatTitleAnimated , isTitleLoading, id, pinnedAt }) => {
          return (
            <ChatItem
              key={id}
              title={title}
              id={id}
              pinnedAt={pinnedAt}
              isTitleLoading={isTitleLoading}
              hasChatTitleAnimated={hasChatTitleAnimated}
            />
          );
        })}
      </ul>
    </div>
  );
}
