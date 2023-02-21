export enum NewListCategoryEnum {
  shop = "Shopping",
  todo = "To-Do",
}

export interface NewListActionInt {
  name: string;
  category: NewListCategoryEnum.shop | NewListCategoryEnum.todo;
}

export interface ListInt extends NewListActionInt {
  id: number;
  userId: number;
  slug: string;
}
