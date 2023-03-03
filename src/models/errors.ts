import { RegisterInputsEnum } from "./auth";

export interface RootErrorInt {
  status?: number;
  statusText?: string;
  message?: string;
  data?: {
    message: string;
  };
}

export interface NewListFormErrorInt {
  name?: string;
  category?: string;
}

export interface AxiosErrorInfoInt {
  status: number;
  statusText: string;
}

export interface AuthFormValidationInt {
  type: RegisterInputsEnum;
  message: string;
}
