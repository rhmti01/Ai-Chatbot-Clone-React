export function handleApiError(error) {
  let message = "An unexpected error occurred.";

  if (error?.message) {
    if (error.message.includes("Failed to fetch")) {
      message = "Network error. Please check your internet connection.";
    } else if (error.message.includes("HTTP 401")) {
      message = "Unauthorized. Server rejected the request.";
    } else if (error.message.includes("HTTP 403")) {
      message = "Forbidden. Access denied or quota exceeded.";
    } else if (error.message.includes("HTTP 429")) {
      message = "Rate limit exceeded. Please try again later.";
    } else if (error.message.includes("HTTP 5")) {
      message = "Server error. Please try again later.";
    } else {
      message = error.message;
    }
  }

  console.error("Client Error:", error);
  return message;
}
