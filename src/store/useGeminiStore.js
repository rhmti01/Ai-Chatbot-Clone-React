import { create } from "zustand";
import { createChatSlice } from "./slices/chatSlice";
import { persist } from "zustand/middleware";

// main store will includes multipule slices! 
export const useGeminiStore = create(
  persist(
    (set, get) => ({
      ...createChatSlice(set, get),
    }),
    {
      name: "ai-chatbot-storage",
      partialize: (state) => ({
        chatsList: state.chatsList,
        currentChatId: state.currentChatId,
      }), 
    }
  )
);