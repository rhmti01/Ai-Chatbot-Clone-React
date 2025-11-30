// SingleChat.jsx
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-full flex-1 relative w-full overflow-auto scroll-smooth
        [&::-webkit-scrollbar]:w-0
        lg:[&::-webkit-scrollbar]:w-2 pt-14
        2xl:[&::-webkit-scrollbar-track]:rounded-2xl 
         2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl
        -------pb-[70vh]---------
        pb-24
           "
    >
    {selectedChat?.messages?.map(({ prompt, responses, id, activeResponseIndex }, index) => {
      const isLast = index === selectedChat.messages.length - 1;

      const activeResponse = responses[activeResponseIndex] || responses[responses.length - 1];

      return (
        <ChatMessage
          key={id}
          isLast={isLast}
          id={id}
          chatPageId={selectedChat.id}
          prompt={prompt}
          responseText={activeResponse.text}
          responseError={activeResponse.error}
          loading={activeResponse.loading}
          hasAnimated={activeResponse.hasAnimated}
          messageActions={activeResponse.MessageActions}
          isTypingTextFinished={activeResponse.isTypingTextFinished}
          responseId={activeResponse.id}
          totalResponsesLength={responses.length}
          activeResponseIndex={activeResponseIndex}  
        />
      );
    })}
    </div>
  );
}

export default SingleChat;