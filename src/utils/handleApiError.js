export function handleApiError(error) {
  let message = "An unexpected error occurred.";

  if (error?.message) {
    if (error.message.includes("Failed to fetch")) {
      message = "Unable to connect to the service, Please check your connection and try again!";
    } else if (error.message.includes("HTTP 401")) {
      message = "Unauthorized. Server rejected the request.";
    } else if (error.message.includes("HTTP 403")) {
      message = "Forbidden. Access denied or quota exceeded.";
    } else if (error.message.includes(` code":429 `) || error.message.includes(`"You exceeded your current quota`)) {
      message = "Rate limit exceeded. please check your plan and billing details.";
    } else if (error.message.includes("HTTP 5")) {
      message = "Server error. Please try again later.";
    } else {
      message = error.message;
    }
  }

  console.error("Client Error:", error);
  return message;
}
