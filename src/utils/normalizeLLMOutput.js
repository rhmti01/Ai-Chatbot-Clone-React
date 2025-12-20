export function normalizeLLMOutput(text) {
  if (typeof text !== "string") return "";

  let t = text;

  // normalize "=" spacing
  t = t.replace(/\s*=\s*/g, " = ");

  // normalize integration constant "C"
  t = t.replace(/C\s*\+/g, "+ C").replace(/\+\s*C/g, " + C");

  // normalize integral spacing for KaTeX
  t = t.replace(/∫\s*([a-zA-Z]+)\s*dx/g, "∫ $1 \\\\, dx");

  // move emojis to a new line
  t = t.replace(
    /([^\n])\s*(💯|😄|😅|🙂|😊|😉|🔥|🚀)/g,
    "$1\n$2"
  );

  // collapse excessive newlines
  t = t.replace(/\n{3,}/g, "\n\n");

  return t.trim();
}
