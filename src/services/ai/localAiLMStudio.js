
const API_URL =  "http://127.0.0.1:1234/v1"

export async function fetchChatResponse(prompt) {
  try {
    const res = await fetch(`${API_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2-4b-instruct-2507",  
        messages: [
          { role: "user", content: prompt }
        ]
      }),
    });

    const data = await res.json();

    return {
      error: false,
      text: data.choices?.[0]?.message?.content || "",
    };

  } catch (error) {
    return {
      error: true,
      text: error.message,
    };
  }
}


export async function generateChatTitle(prompt) {
  try {
    const res = await fetch(`${API_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2-4b-instruct-2507",
        messages: [
          {
            role: "user",
            content: `Generate a short chat title (max 4 words): ${prompt}`
          }
        ]
      }),
    });

    const data = await res.json();

    return {
      error: false,
      title: data.choices?.[0]?.message?.content || "New Chat",
    };
  } catch {
    return {
      error: true,
      title: "New Chat",
    };
  }
}
