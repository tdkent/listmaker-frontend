// Router fallback error page

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
