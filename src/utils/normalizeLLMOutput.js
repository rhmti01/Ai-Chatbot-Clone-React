export function normalizeLLMOutput(text) {
  if (typeof text !== "string") return "";

  let t = text;

  // normalize equals spacing (math-friendly)
  t = t.replace(/\s*=\s*/g, " = ");

  // normalize integration constant
  t = t
    .replace(/\+\s*C\b/g, " + C")
    .replace(/\bC\s*\+/g, "C + ");

  // normalize integrals for KaTeX
  t = t.replace(/∫\s*([a-zA-Z]+)\s*dx/g, "∫ $1 \\\\ dx");

  // move emojis to new line (avoid inline break issues)
  t = t.replace(
    /([^\n])\s*(💯|😄|😅|🙂|😊|😉|🔥|🚀)/g,
    "$1\n$2"
  );

  // collapse excessive newlines
  t = t.replace(/\n{3,}/g, "\n\n");

  return t.trim();
}
