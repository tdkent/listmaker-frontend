import { createContext } from "react";
import { AxiosError } from "axios";

export interface ErrorContextInt {
  active: boolean;
  toggleError: (value: boolean) => void;
  data: AxiosError | null;
  provideData: (value: AxiosError | null) => void;
}

const ErrorContext = createContext<ErrorContextInt>({
  active: false,
  toggleError: () => {},
  data: null,
  provideData: () => {},
});

export default ErrorContext;
