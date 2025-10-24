import runChat from "../../services/gemini";

export const createChatSlice = (set, get) => ({
  chatsList: [],
  resultData: "",
  inputPrompt: "",

  onSendPrompt: async () => {
    const { input } = get();
    if (!input.trim()) return;

    set({
      resultData: "",
      inputPrompt: input,
      input: "",
      chatScreenMode: "response",
      loading: true,
      showResults: true,
    });

    const response = await runChat(input);

    set({
      resultData: response,
      chatsList: [
        ...get().chatsList,
        { prompt: input, response, id: new Date().getTime() },
      ],
      loading: false,
      showResults: false,
    });
  },
  setChatsList: (v) => set({ chatsList: v }),
  setResultData: (v) => set({ resultData: v }),
  setInputPrompt: (v) => set({ inputPrompt: v }),
});
