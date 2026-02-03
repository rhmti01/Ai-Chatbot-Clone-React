import { extractMainText } from "./extractMainText";

export function detectMainLanguage(text) {
  const cleaned = extractMainText(text);
  if (!cleaned) {
    return { lang: "unknown", dir: "ltr", confidence: 0 };
  }

  // Character frequency scores per language/script
  const scores = {
    fa: 0, // Persian
    ar: 0, // Arabic
    en: 0, // English / Latin
    ru: 0, // Cyrillic
    zh: 0  // Chinese
  };

  for (const char of cleaned) {
    if (/[\u0600-\u06FF]/.test(char)) scores.fa++;
    else if (/[\u0621-\u064A]/.test(char)) scores.ar++;
    else if (/[A-Za-z]/.test(char)) scores.en++;
    else if (/[\u0400-\u04FF]/.test(char)) scores.ru++;
    else if (/[\u4E00-\u9FFF]/.test(char)) scores.zh++;
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) {
    return { lang: "unknown", dir: "ltr", confidence: 0 };
  }

  // Determine dominant language by max score
  const lang = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  return {
    lang,
    dir: ["fa", "ar"].includes(lang) ? "rtl" : "ltr",
    confidence: +(scores[lang] / total).toFixed(2)
  };
}
