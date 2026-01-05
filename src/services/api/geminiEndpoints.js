import { handleApiError } from "../../utils/api/handleApiError";
import { responseFormatter } from "../../utils/api/responseFormatter";
import { chatModel } from "./geminiClient";

export let lastAiUsageStats = null ;

export async function fetchChatResponse(PROMPT) {
    try {

        const result = await chatModel.generateContent(PROMPT);
        const response = result.response;
        const aiResponseText = response.text()
        lastAiUsageStats = response.usageMetadata;
        
        if (!aiResponseText) {
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
        const titlePrompt = `
        System role:
        You are an assistant specialized in extracting concise, domain-accurate chat titles for a technical chat application.

        Objective:
        Derive a meaningful and specific chat title that represents the PRIMARY subject of the input text.

        Guidelines:
        - Language: Use the same language as the input text.
        - Length: 3 to 4 words only.
        - Character limit: Maximum 18 characters including spaces.
        - Style: Formal, neutral, non-marketing.
        - Semantic rule:
        - Identify the single dominant concept, entity, or problem.
        - Prefer concrete nouns over abstract phrasing.
        - Vocabulary rule:
        - You MAY reuse key domain words from the input if necessary.
        - Do NOT copy entire sentences or long phrases.
        - Avoid:
        - Generic titles
        - Broad summaries
        - Emotional or conversational wording
        - Punctuation or quotation marks

        Output:
        Plain text only. One line. No explanations.

        Input:
        ${firstPrompt}
        `;


        const result = await chatModel.generateContent(titlePrompt);
        const response = result.response;
        const aiGeneratedTitle = response.text().trim()

        return {
            error:false ,
            title : aiGeneratedTitle
        }

    } catch (error) {
        console.error(` title generation failed for : ${firstPrompt}  `  , error ) 
        return { error : true , title : "New Message" }
    }
}



