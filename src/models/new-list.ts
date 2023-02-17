export enum NewListCategoryEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export interface NewListActionInt {
  listName: string;
  listCategory: NewListCategoryEnum.shop | NewListCategoryEnum.todo;
}

export interface ListInt extends NewListActionInt {
  id: number;
  creatorId: number;
  slug: string;
}

export interface ShoppingListInt extends ListInt {
  currentItems: string[];
  previousItems: string[];
}
