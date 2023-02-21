import { ListInt } from "./new-list";

export interface ShoppingListItemInt {
  id: number;
  name: string;
  isDone: boolean;
}

export interface ShoppingListInt extends ListInt {
  items: ShoppingListItemInt[];
}
