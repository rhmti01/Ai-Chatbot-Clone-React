import { create } from "zustand";
import { createUiSlice } from "./slices/uiSlice";
import { createPromptSlice } from "./slices/promptSlice";
import { createChatSlice } from "./slices/chatSlice";

export const useGeminiStore = create((set, get) => ({
  ...createUiSlice(set, get),
  ...createPromptSlice(set, get),
  ...createChatSlice(set, get),
}));
