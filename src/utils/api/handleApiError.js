export function handleApiError(error) {
  let message = "An unexpected error occurred.";

  if (error?.message) {
    const msg = error?.message.toLowerCase();
  
     if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("network request failed")) {
      message = "Unable to connect to the service. Please check your internet connection or CORS policy and try again!";
    } else if (msg.includes("you exceeded your current quota, please check your plan and billing details.")) {
      message = "Rate limit exceeded. Please check your plan and billing details.";
    } else {
      message = msg;
    }
  }

  return message;
}

