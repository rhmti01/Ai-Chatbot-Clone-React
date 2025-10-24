export const createPromptSlice = (set) => ({
  input: "",
  recentPrompts: "",
  prevPrompts: [],
  setInput: (v) => set({ input: v }),
  setRecentPrompts: (v) => set({ recentPrompts: v }),
  setPrevPrompts: (v) => set({ prevPrompts: v }),
});
