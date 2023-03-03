import { AxiosError } from "axios";
import { AxiosErrorInfoInt } from "../models/errors";

const handleCatch = (error: AxiosError): AxiosErrorInfoInt => {
  if (error.response) {
    console.log("Response error here", error.response);
    // Request made and server responded
    return {
      status: 404,
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
    };
  }
};
export default handleCatch;
