import { handleApiError } from "../../utils/api/handleApiError";
import { responseFormatter } from "../../utils/api/responseFormatter";
import { chatModel, geminiApi } from "./geminiClient";

export let lastAiUsageStats = null ;

export async function fetchChatResponse(PROMPT) {
    try {
        if (!geminiApi) {
            return {
                error: true,
                text: "API key is missing. Please configure VITE_GEMINI_API_KEY in your environment variables.",
            };  
        }

        const result = await chatModel.generateContent(PROMPT);
        const response = result.response;
        lastAiUsageStats = response.usageMetadata;
        const aiResponseText = response.text()
        
        if (!aiResponseText || "") {
            return {
                error: true,
                text: "Empty response received from API.",
            };
        }
        
        return {
            error: false,
            text: responseFormatter(aiResponseText),
        };

  } catch (error) {
        const errorMessage = handleApiError(error);
        return {
        error: true,
        text: errorMessage,
        };
    } 
}

export async function generateChatTitle(firstPrompt) {
    try {
        if (!geminiApi) {
            return {
                error: true,
                text: "API key is missing. Please configure VITE_GEMINI_API_KEY in your environment variables.",
            };  
        }

        const titlePrompt = `Generate a very short chat title for the text below.
            Rules:
            1. Language: Use the EXACT language of the input text.
            2. Length: Maximum 18 characters (including spaces). This is a strict visual limit.
            3. Content: Concise and relevant (max 3-4 words).
            4. Format: Plain text only, no quotes, no periods.

            Text: "${firstPrompt}"`; 
        const result = await chatModel.generateContent(titlePrompt);
        const { text:aiGeneratedTitle } = result.response;

        return {
            error:false ,
            title : aiGeneratedTitle.trim()
        }

    } catch (error) {
        console.error(` title generation failed for : ${firstPrompt}  `  , error ) 
        return { error : true , title : null }
    }
}



