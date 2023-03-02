export interface RootErrorInt {
  status?: number;
  statusText?: string;
  message?: string;
  data?: {
    message: string;
  };
}

export interface AuthFormErrorInt {
  isError: boolean;
  errorType: string;
  errorMessage: string;
}

export interface NewListFormErrorInt {
  name?: string;
  category?: string;
}

export interface ErrorDisplayInt {
  status: number;
  statusText: string;
}
