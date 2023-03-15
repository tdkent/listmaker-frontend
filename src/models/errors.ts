// Form validation errors
import { RegisterInputsEnum, LoginInputsEnum } from "./auth";
import { EditListInputsEnum, NewListInputsEnum } from "./lists";

export interface FormValidationInt {
  type: RegisterInputsEnum | LoginInputsEnum | NewListInputsEnum | EditListInputsEnum;
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

// Axios errors
// TODO: This can be deleted once handleCatch func is no longer being used
export interface AxiosErrorInfoInt {
  status: number;
  statusText: string;
}
