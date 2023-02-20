import { ListInt } from "./new-list";

interface ShoppingListInt extends ListInt {
  data: {
    currentItems: string[];
    previousItems: string[];
  };
}

export default ShoppingListInt;
