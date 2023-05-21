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
