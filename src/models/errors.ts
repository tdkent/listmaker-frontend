// Form validation errors
import { RegisterInputsEnum, LoginInputsEnum } from "./auth";
import { NewListInputsEnum } from "./new-list";

export interface FormValidationInt {
  type: RegisterInputsEnum | LoginInputsEnum | NewListInputsEnum;
  message: string;
}

// Router fallback error page
export interface RootErrorInt {
  status?: number;
  statusText?: string;
  message?: string;
  data?: {
    message: string;
  };
}

// Axios errors
export interface AxiosErrorInfoInt {
  status: number;
  statusText: string;
}
