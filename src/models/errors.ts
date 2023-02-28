export interface RootErrorInt {
  status?: number;
  statusText?: string;
  message?: string;
  data?: {
    message: string;
  };
}

export interface AuthFormErrorInt {
  email?: string;
  username?: string;
  password?: string;
}

export interface NewListFormErrorInt {
  name?: string;
  category?: string;
}

export interface ErrorDisplayInt {
  status: number;
  statusText: string;
}
