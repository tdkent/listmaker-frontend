// Generic List
export enum NewListTypeEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export const newListTypes = [NewListTypeEnum.shop, NewListTypeEnum.todo];

export interface ListInt {
  id: number;
  userId: number;
  name: string;
  slug: string;
  category: NewListTypeEnum.shop | NewListTypeEnum.todo | "";
  items: ShoppingListItemInt[] | [];
  isLoaded: boolean;
}

// Shopping List
export interface ShoppingListItemInt {
  id: number;
  name: string;
  isDone: boolean;
}

export interface ShoppingListInt extends ListInt {
  items: ShoppingListItemInt[];
}

export interface ListsResponseInt {
  status: number;
  statusText: string;
  data?: ListInt[];
}
