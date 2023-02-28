import { AxiosError } from "axios";

const handleCatch = (
  error: AxiosError
): {
  status: number;
  statusText: string;
} => {
  if (error.response) {
    // Request made and server responded
    return {
      status: error.response.status,
      statusText: error.response.statusText,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 503,
      statusText: "No Response",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      status: 500,
      statusText: error.message,
      // data: {} as UserInfoInt,
    };
  }
};

export default handleCatch;
