import { create } from "zustand";
import { createChatSlice } from "./slices/chatSlice";

// main store will includes multipule slices! 
export const useGeminiStore = create((set, get) => ({
  ...createChatSlice(set, get),
}));
