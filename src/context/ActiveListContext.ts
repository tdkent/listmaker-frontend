import { createContext } from "react";

import { ListInt } from "../models/lists";

export interface ActiveListContextInt {
  list: ListInt;
  addListToContext: (list: ListInt) => void;
}

const ActiveListContext = createContext<ActiveListContextInt>({
  list: {} as ListInt,
  addListToContext: () => {},
});

export default ActiveListContext;
