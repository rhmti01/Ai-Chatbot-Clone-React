import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import { useGeminiStore } from "../store/useGeminiStore";

function HomePage() {
  const pathName = location.pathname;
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);
  console.log(currentChatId);

  useEffect(() => {
    if (pathName == "/chats" || pathName == "/" ||  pathName == "/chats/") {
      setCurrentChatId(null)
    }
  }, [pathName, setCurrentChatId]);

  return (
    <div className="  font-outfit relative min-w-full h-dvh lg:grid lg:grid-cols-[clamp(280px,25vw,330px)_1fr] grid-rows-1 overflow-hidden ">
      <Sidebar />
      <ChatScreen />
    </div>
  );
}

export default HomePage;
