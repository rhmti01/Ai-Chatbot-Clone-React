import runChat from "../../services/gemini";

export const createChatSlice = (set, get) => ({
    //  initial values
  chatsList: [],
  inputText: "",
  inputPrompt: "",
  loading: false,
  showResult: false,
  chatScreenMode: "starter", // this will be removed when react router would be added

  // initial methods
  setInputText: (value) => set({ inputText: value }),
  setChatsList: (value) => set({ chatsList: value }),
  setInputPrompt: (value) => set({ inputPrompt: value }),
  setLoading: (value) => set({ loading: value }),
  setshowResult: (value) => set({ showResult: value }),
  setChatScreenMode: (value) => set({ chatScreenMode: value }),

  // fetch prompt response from api
  onSendPrompt: async () => {
    const { inputText, chatsList } = get();
    if (!inputText.trim()) return;

    const newChat = { id: Date.now(), prompt: inputText, response: null };

    // sending step
    set({
      inputText: "",
      chatScreenMode: "response",
      chatsList: [...chatsList, newChat],
      loading: true,
      showResult: true,
    });

    const response = await runChat(inputText);

    // reading step
    set({
      chatsList: get().chatsList.map((chat) =>
        chat.id === newChat.id ? { ...chat, response } : chat
      ),
      loading: false,
      showResult: false,
    });
  },
});
