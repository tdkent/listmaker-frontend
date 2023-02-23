// Generic List
export enum NewListCategoryEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export interface ListInt {
  id: number;
  userId: number;
  name: string;
  slug: string;
  category: NewListCategoryEnum.shop | NewListCategoryEnum.todo | "";
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
