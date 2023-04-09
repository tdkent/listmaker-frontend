// Form validation errors
import { RegisterInputsEnum, LoginInputsEnum } from "./auth";
import { EditListInputsEnum, NewListFormEnum } from "./lists";

export interface FormValidationInt {
  type: RegisterInputsEnum | LoginInputsEnum | NewListFormEnum | EditListInputsEnum;
  message: string;
}

// Router fallback error page
// TODO: Update Root Error page
export interface RootErrorInt {
  status?: number;
  statusText?: string;
  message?: string;
  data?: {
    message: string;
  };
}

export interface ValidationError {
  location: string;
  msg: string;
  param: string;
  value: string;
}
