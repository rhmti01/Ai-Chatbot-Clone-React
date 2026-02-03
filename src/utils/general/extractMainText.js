export function extractMainText(rawText) {
  if (!rawText || typeof rawText !== "string") return "";

  let text = rawText;

  // Remove fenced code blocks (``` ... ```)
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code (`...`)
  text = text.replace(/`[^`]*`/g, "");

  // Remove JSON keys ("key":)
  text = text.replace(/"[^"]+"\s*:/g, "");

  // Remove URLs
  text = text.replace(/https?:\/\/\S+/g, "");

  // Remove numbers and structural symbols
  text = text.replace(/[0-9{}[\];(),.:=_<>/+*-]/g, " ");

  // Remove emojis and pictographic symbols
  text = text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");

  return text.trim();
}
