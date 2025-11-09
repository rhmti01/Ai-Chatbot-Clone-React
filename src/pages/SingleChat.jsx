import { useEffect, useRef } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";

function SingleChat() {
  const chatsList = useGeminiStore((state) => state.chatsList) || [];
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const selectedChat = chatsList.find((chat) => chat.id === currentChatId);
  const chatContainerRef = useRef();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-full flex-1 relative w-full overflow-auto scroll-smooth
        2xl:[&::-webkit-scrollbar]:w-2 mb-16 
        2xl:[&::-webkit-scrollbar-track]:rounded-2xl 2xl:[&::-webkit-scrollbar-track]:bg-sub/40
        2xl:[&::-webkit-scrollbar-thumb]:bg-gray-400 2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl"
    >
      {selectedChat?.messages?.map(({ prompt, response, id, loading , loadWithAnimation }) => (
        <ChatMessage
          key={id}
          prompt={prompt}
          response={response}
          loading={loading}
          loadWithAnimation={loadWithAnimation}
        />
      ))}
    </div>
  );
}

export default SingleChat;
