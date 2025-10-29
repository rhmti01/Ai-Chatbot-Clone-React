import runChat from "../../services/gemini";
import { timeBasedUUID } from "../../utils/timeBasedUUID";

export const createChatSlice = (set, get) => ({
    //  initial values
  chatsList: [],
  inputText: "",
  inputPrompt: "",
  loading: false,
  showResult: false,
  chatUUID :"" ,
  currentChatId : null ,

  // initial methods
  setInputText: (value) => set({ inputText: value }),
  setChatsList: (value) => set({ chatsList: value }),
  setInputPrompt: (value) => set({ inputPrompt: value }),
  setLoading: (value) => set({ loading: value }),
  setshowResult: (value) => set({ showResult: value }),
  setChatUUID : (value)=> set({chatUUID : value}) ,
  setCurrentChatId : (value)=> set({currentChatId : value}) ,

  // fetch prompt response from api
  onSendPrompt: async (navigate) => {
    const { inputText, chatsList } = get();
    if (!inputText.trim()) return;
    
    const newChat = { id: Date.now(), prompt: inputText, response: null };
    const uuidNumber = timeBasedUUID()
    navigate(uuidNumber)

    // sending step
    set({
      inputText: "",
      chatsList: [...chatsList, newChat],
      loading: true,
      showResult: true,
      chatUUID : uuidNumber ,
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
