
import { uuidGenerator } from "../../utils/general/uuidGenerator";
import { buildLLMPrompt } from "../../utils/general/promptBuilder";
import { fetchChatResponse, generateChatTitle } from "../../services/ai/localAiLMStudio";

export const createChatSlice = (set, get) => ({
  // initial values
  chatsList: [],
  inputText: "",
  showResult: false,
  chatUUID: "",
  currentChatId: null,
  selectedResponseMode: "default",
  userName : 'New User' ,
  selectedProvider: "gemini",
  
  
  // initial methods
  setInputText: (value) => set({ inputText: value }),
  setChatsList: (value) => set({ chatsList: value }),
  setChatUUID: (value) => set({ chatUUID: value }),
  setCurrentChatId: (value) => set({ currentChatId: value }),
  setUserName: (value) => set({ userName: value }),
  setSelectedResponseMode: (modeId) => set({ selectedResponseMode: modeId }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),

  // fetch prompt response from API
  onSendPrompt: async (navigate) => {
    const { inputText, chatsList, currentChatId , selectedProvider } = get();
    if (!inputText.trim()) return;

    // create new prompt structure
    const singlePromptData = {
      id: Date.now(),
      prompt: inputText,
      activeResponseIndex: 0,
      responses: [
        {
          id: Date.now(),
          text: "",
          error: false,
          loading: true,
          hasAnimated: false,
          MessageActions: false,
          isTypingTextFinished: false,
          isResponseLiked: null,
        },
      ],
    };

    // create new message
    const newMessage = {
      id: Date.now(),
      activePromptIndex: 0,
      prompts: [singlePromptData],
    };

    // CASE 1: if there is no active chat -> create new chat group
    if (!currentChatId) {

      const chatUUID = uuidGenerator();
      navigate(`/c/${chatUUID}`);
      
      // define new chat structure
      const chatData = {
        id: chatUUID,
        title: "",
        hasChatTitleAnimated : false,
        isTitleLoading : true,
        messages: [newMessage],
        createdAt : Date.now(),
        pinnedAt : null,
      };

      // update store state
      set({
        inputText: "",
        chatsList: [...chatsList, chatData],
        showResult: true,
        chatUUID,
        currentChatId: chatUUID,
      });

      // update chat title by ai generated value
      generateChatTitle(inputText).then((result) => {
        set((state) => ({
          chatsList: state.chatsList.map((chat) =>
            chat.id === chatUUID
              ? { ...chat,
                 title: result.title ,
                 isTitleLoading : false }
              : chat
          ),
        }));
      });
    }
    // CASE 2: existing chat
    else {
      set({
        inputText: "",
        chatsList: get().chatsList.map((chatData) =>
          chatData.id === currentChatId
            ? { ...chatData, messages: [...chatData.messages, newMessage] }
            : chatData
        ),
        showResult: true,
      });
    }

    // fetch response from AI API
    const finalPrompt = buildLLMPrompt(inputText, get().selectedResponseMode);
   const apiResponse = await fetchChatResponse(finalPrompt, selectedProvider);

    // update response
    set({
      chatsList: get().chatsList.map((chatData) => {
        if (chatData.id === get().currentChatId) {
          const updatedMessages = chatData.messages.map((msg) =>
            msg.id === newMessage.id
              ? {
                  ...msg,
                  prompts: msg.prompts.map((singlePrompt) => {
                    if (singlePrompt.id !== singlePromptData.id) return singlePrompt;

                    return {
                      ...singlePrompt,
                      responses: singlePrompt.responses.map((singleResponse, index) => {
                        if (index !== singlePrompt.activeResponseIndex)
                          return singleResponse;

                        return {
                          ...singleResponse,
                          hasAnimated: false,
                          loading: false,
                          text: apiResponse.text,
                          error: apiResponse.error,
                        };
                      }),
                    };
                  }),
                }
              : msg
          );
          return { ...chatData, messages: updatedMessages };
        }
        return chatData;
      }),
      showResult: false,
    });
  },

  // edit prompt text and generate new prompt
  onEditPrompt: async (chatPageId, messageId, newPromptText) => { 
    const { selectedProvider } = get();
    const newPromptId = Date.now();
    const newResponseId = Date.now() + 1;

    //  truncate messages + add new prompt (atomic)
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        const messageIndex = chat.messages.findIndex(
          (msg) => msg.id === messageId
        );

        if (messageIndex === -1) return chat;

        return {
          ...chat,
          messages: chat.messages
            .slice(0, messageIndex + 1)
            .map((msg) => {
              if (msg.id !== messageId) return msg;

              const newPromptData = {
                id: newPromptId,
                prompt: newPromptText,
                activeResponseIndex: 0,
                responses: [
                  {
                    id: newResponseId,
                    text: "",
                    error: false,
                    loading: true,
                    hasAnimated: false,
                    MessageActions: false,
                    isTypingTextFinished: false,
                    isResponseLiked: null,
                  },
                ],
              };

              return {
                ...msg,
                prompts: [...msg.prompts, newPromptData],
                activePromptIndex: msg.prompts.length,
              };
            }),
        };
      }),
    }));

    // fetch response
    const finalPrompt = buildLLMPrompt(newPromptText, get().selectedResponseMode);
    const apiResponse = await fetchChatResponse(finalPrompt, selectedProvider);

    //  update response by ID (safe async)
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((prompt) => {
                if (prompt.id !== newPromptId) return prompt;

                return {
                  ...prompt,
                  responses: prompt.responses.map((resp) =>
                    resp.id !== newResponseId
                      ? resp
                      : {
                          ...resp,
                          text: apiResponse.text,
                          error: apiResponse.error,
                          loading: false,
                          hasAnimated: false,
                        }
                  ),
                };
              }),
            };
          }),
        };
      }),
    }));
  },

  // regenerate response
  onRegenerateResponse: async (chatPageId, messageId, promptText, promptId) => {
    const { selectedProvider } = get();
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt) => {
                if (singlePrompt.id !== promptId) return singlePrompt;

                // create new response structure
                const newResponse = {
                  id: Date.now(),
                  text: "",
                  error: false,
                  loading: true,
                  hasAnimated: false,
                  MessageActions: false,
                  isTypingTextFinished: false,
                };

                return {
                  ...singlePrompt,
                  responses: [...singlePrompt.responses, newResponse],
                  activeResponseIndex: singlePrompt.responses.length,
                };
              }),
            };
          }),
        };
      }),
      showResult: true,
    }));

    // fetch response from AI API
    const finalPrompt = buildLLMPrompt(promptText, get().selectedResponseMode);
    const apiResponse = await fetchChatResponse(finalPrompt, selectedProvider);

    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt) => {
                if (singlePrompt.id !== promptId) return singlePrompt;

                return {
                  ...singlePrompt,
                  responses: singlePrompt.responses.map((singleResponse, index) => {
                    if (index !== singlePrompt.activeResponseIndex)
                      return singleResponse;

                    return {
                      ...singleResponse,
                      text: apiResponse.text,
                      error: apiResponse.error,
                      loading: false,
                      hasAnimated: false,
                    };
                  }),
                };
              }),
            };
          }),
        };
      }),
      showResult: false,
    }));
  },

  // switch prompt
  onSwitchPrompt: (chatPageId, messageId, direction) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

                let newIndex = msg.activePromptIndex + direction;
                newIndex = Math.max(0, newIndex);
                newIndex = Math.min(newIndex, msg.prompts.length - 1);

                // update active prompt index
                return {
                  ...msg,
                  activePromptIndex: newIndex,
                };

          }),
        };
      }),
    }));
  },

  // switch response
  onSwitchResponse: (chatPageId, messageId, promptId, direction) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt) => {
                if (singlePrompt.id !== promptId) return singlePrompt;

                let newIndex = singlePrompt.activeResponseIndex + direction;
                newIndex = Math.max(0, newIndex);
                newIndex = Math.min(newIndex, singlePrompt.responses.length - 1);

                // update active response index
                return {
                  ...singlePrompt,
                  activeResponseIndex: newIndex,
                };
              }),
            };
          }),
        };
      }),
    }));
  },

  // like toggle
  onToggleResponseLike: (chatPageId, messageId, promptId, responseId, status) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatPageId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt) => {
                if (singlePrompt.id !== promptId) return singlePrompt;

                // update response like status
                return {
                  ...singlePrompt,
                  responses: singlePrompt.responses.map((response) => {
                    if (response.id !== responseId) return response;

                    return { ...response, isResponseLiked: status };
                  }),
                };
              }),
            };
          }),
        };
      }),
    }));
  },

  // delete chat
  onDeleteChat: (chatId) => {
    set({
      chatsList: get().chatsList.filter((chat) => chat.id !== chatId),
    });
  },

  // pin chat
  onPinChat: (chatId) => {
    const now = Date.now();

    set((state) => ({
      chatsList: state.chatsList.map((chat) =>
        chat.id === chatId
          ? { ...chat, pinnedAt: now }
          : chat
      ),
    }));
  },

  // unpin chat 
  onUnpinChat : (chatId)=>{
    set((state) => ({
      chatsList : state.chatsList.map((chat)=>
        chat.id === chatId
        ? {...chat , pinnedAt : null}
        : chat
      )
    }))
  },

  // edit chat title
  onEditChatTitle: (chatId, updatedTitle) => {
    set({
      chatsList: get().chatsList.map((chat) =>
        chat.id === chatId ? { ...chat, title: updatedTitle } : chat
      ),
    });
  },

  // set message response animation flag
  setMessageAnimated: (chatId, messageId, promptId, responseId) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.id !== messageId) return msg;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt) => {
                if (singlePrompt.id !== promptId) return singlePrompt;

                // update message animation flag
                return {
                  ...singlePrompt,
                  responses: singlePrompt.responses.map((singleResponse) => {
                    if (singleResponse.id !== responseId) return singleResponse;

                    return { ...singleResponse, hasAnimated: true };
                  }),
                };
              }),
            };
          }),
        };
      }),
    }));
  },

  // set chat title animation flag
  setChatTitleAnimated : (chatId) =>{
    set((state)=>({
      chatsList : state.chatsList.map((chat) =>{
        if (chat.id !== chatId) return chat 

        return {
          ...chat ,
          hasChatTitleAnimated : true,
        }
      })
    }))
  }
});
