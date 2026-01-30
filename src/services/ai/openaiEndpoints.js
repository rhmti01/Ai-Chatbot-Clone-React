import { handleApiError } from "../../utils/api/handleApiError";
import { responseFormatter } from "../../utils/api/responseFormatter";

const API_URL = "http://localhost:3001/api";

export async function fetchChatResponse(prompt) {
  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message);
    }

    return {
      error: false,
      text: responseFormatter(data.text),
    };
  } catch (error) {
    return {
      error: true,
      text: handleApiError(error),
    };
  }
}

export async function generateChatTitle(prompt) {
  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Generate a short chat title (max 4 words): ${prompt}`,
          },
        ],
      }),
    });

    const data = await res.json();

    return {
      error: false,
      title: data.text,
    };
  } catch {
    return {
      error: true,
      title: "New Chat",
    };
  }
}
