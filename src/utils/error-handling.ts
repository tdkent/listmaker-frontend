import axios, { AxiosError } from "axios";

const handleCatch = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("404, Resource Not Found.");
        // TODO: Custom server errors
      } else throw new Error("Custom error response from the server.");
    } else if (error.request) {
      throw new Error(
        "Response not received. The server may be temporarily offline. Please try again later."
      );
    } else {
      throw new Error("An unknown error occurred.");
    }
  } else throw new Error(error.message || "An unknown error occurred.");
};

export default handleCatch;
