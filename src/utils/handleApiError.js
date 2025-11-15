import toast from "react-hot-toast";

export function handleApiError() {
  const handleError = (error) => {
    let message = "An unexpected error occurred.";

    if (error?.response?.status) {
      const status = error.response.status;

      if (error.response.data?.error?.message) {
        message = error.response.data.error.message;
      } else {
        switch (status) {
          case 400: message = "Bad request. Please check your input format."; break;
          case 401: message = "Unauthorized. Your API key is invalid or expired."; break;
          case 403: message = "Forbidden. You do not have access to this model or quota exceeded."; break;
          case 404: message = "Requested model or endpoint not found."; break;
          case 429: message = "Rate limit exceeded. Please try again later."; break;
          case 500:
          case 502:
          case 503: message = "Server error. The service might be temporarily unavailable."; break;
          default: message = `HTTP Error ${status}.`; 
        }
      }
    } 
    else if (error?.message) {
      if (error.message.includes("Failed to fetch")) {
        message = "Network error. Please check your internet connection.";
      } else if (error.message.includes("CORS")) {
        message = "CORS error. Cannot access the API from this origin.";
      } else {
        message = error.message;
      }
    }

    console.error("API Error:", error);
    toast.error(message);
    return message;      
  };

  return { handleError };
}
