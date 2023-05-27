import { useContext } from "react";
import { AxiosError } from "axios";

import ErrorContext from "../../context/ErrorContext";
import { ValidationError } from "../../models/errors";
import Button from "../forms/Button";
import Close from "../../icons/Close";
import CircleExclamation from "../../icons/CircleExclamation";

interface Props {
  errorData: AxiosError;
}

const ShowApiError = ({ errorData }: Props) => {
  const { toggleError, provideData } = useContext(ErrorContext);
  const handleClick = () => {
    toggleError(false);
    provideData(null);
  };
  if (errorData) {
    let errMsg: string = "Server currently unavailable. Try again later.";
    if (errorData && errorData.response) {
      if ((errorData.response.data as { message: string }).message) {
        errMsg = (errorData.response.data as { message: string }).message;
      } else errMsg = (errorData.response.data as { errors: ValidationError[] }).errors[0].msg;
    }
    return (
      <div
        id="api-error"
        className="flex flex-row justify-between items-center mb-4 px-2 pr-1.5 py-2.5 border rounded-md text-sm text-white font-semibold bg-red-600 hover:cursor-pointer"
        onClick={handleClick}>
        <div className="flex flex-row items-center">
          <CircleExclamation styles="w-5 h-5 mr-2" />
          <p>{errMsg}</p>
        </div>

        <Button type="button" text={<Close styles="w-6 h-6" />} handleClick={handleClick} />
      </div>
    );
  }

  return null;
};

export default ShowApiError;
