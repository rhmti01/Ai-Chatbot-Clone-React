export function handleApiError(error) {
  let message = "An unexpected error occurred.";

  if (error?.message) {
    const msg = error?.message;
  
     if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("Network request failed")) {
      message = "Unable to connect to the service. Please check your internet connection or CORS policy and try again!";
    } else if (msg.includes(`"You exceeded your current quota`)) {
      message = "Rate limit exceeded. Please check your plan and billing details.";
    } else {
      message = msg;
    }
  }

  return message;
}

