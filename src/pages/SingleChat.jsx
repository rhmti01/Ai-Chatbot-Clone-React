import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";

function SingleChat() {
  const chatsList = useGeminiStore((state) => state.chatsList);
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  console.log(currentChatId);
  console.log(chatsList);

  return (
    <div
      className="h-full flex-1 relative w-full overflow-auto scroll-smooth
      2xl:[&::-webkit-scrollbar]:w-2 pb-20 
      2xl:[&::-webkit-scrollbar-track]:rounded-2xl 2xl:[&::-webkit-scrollbar-track]:bg-sub/40
      2xl:[&::-webkit-scrollbar-thumb]:bg-gray-400 2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl"
    >
      {chatsList.map(({ prompt, response, id, loading }) => (
        <ChatMessage
          key={id}
          prompt={prompt}
          response={response}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default SingleChat;
