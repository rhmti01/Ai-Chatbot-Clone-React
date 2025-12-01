import { useEffect, useMemo, useRef } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";

function SingleChat() {
  const chatContainerRef = useRef();
  const chatsList = useGeminiStore((state) => state.chatsList);
  const currentChatId = useGeminiStore((state) => state.currentChatId);

  const selectedChat = useMemo(
    () => chatsList.find((chat) => chat.id === currentChatId),
    [chatsList, currentChatId]
  );

  const prevChatIdRef = useRef(currentChatId);
  const prevMessagesLengthRef = useRef(selectedChat?.messages?.length || 0);

  // manage page scroll on user behavior
  useEffect(() => {
    if (!chatContainerRef.current || !selectedChat) return;

    const container = chatContainerRef.current;
    const currentLength = selectedChat.messages.length;

    // scroll with new message 
    if (currentChatId !== prevChatIdRef.current) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
      });
      // scroll by chats page switch
    } else if (currentLength > prevMessagesLengthRef.current) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
      });
    }

    prevChatIdRef.current = currentChatId;
    prevMessagesLengthRef.current = currentLength;
  }, [selectedChat.messages.length, currentChatId, selectedChat]);

  return (
    <div
      ref={chatContainerRef}
      className="h-full flex-1 relative w-full overflow-auto scroll-smooth
        [&::-webkit-scrollbar]:w-0
        lg:[&::-webkit-scrollbar]:w-2 pt-14 pb-28"
    >
      {selectedChat?.messages?.map(
        ({ prompt, responses, id, activeResponseIndex }, index) => {
          const isLast = index === selectedChat.messages.length - 1;
          const activeResponse =
            responses[activeResponseIndex] || responses[responses.length - 1];

          return (
            <ChatMessage
              key={id}
              id={id}
              data-chat-message
              isLast={isLast}
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
              isResponseLiked={activeResponse.isResponseLiked}
            />
          );
        }
      )}
    </div>
  );
}

export default SingleChat;
