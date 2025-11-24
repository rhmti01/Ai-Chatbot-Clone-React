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
        -------pb-[70vh]---------
        pb-24
        2xl:[&::-webkit-scrollbar-track]:rounded-2xl 
         2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl
           "
    >
      {selectedChat?.messages?.map(
        (
          {
            prompt,
            responses,
            response,
            id,
            loading,
            hasAnimated,
            MessageActions,
            isTypingTextFinished,
          },
          index
        ) => {
          const isLast = index === selectedChat.messages.length - 1;
          let activeResponse;
          if (responses) {
            activeResponse = responses.find((resp) => resp.active) || responses[responses.length - 1];
          } else {
            activeResponse = {
              id: 'legacy-' + id,
              text: response?.text || '',
              error: response?.error || false,
              loading: loading || false,
              hasAnimated: hasAnimated || false,
              MessageActions: MessageActions || false,
              isTypingTextFinished: isTypingTextFinished || false,
              active: true,
            };
          }

          return (
            <ChatMessage
              key={index}
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
            />
          );
        }
      )}
    </div>
  );
}

export default SingleChat;