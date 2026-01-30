export function handleApiError(error) {
  if (typeof error === "string") return error;

  if (error?.error === "AI_CALL_FAILED") {
    return "AI service is currently unavailable. Please try again later.";
  }

  if (error?.message) {
    return error.message;
  }

  return "Unexpected error occurred.";
}
