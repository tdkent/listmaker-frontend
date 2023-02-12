import ListCategory from "./list-category";

export default interface ShoppingList {
  id: number;
  creatorId: number;
  listType: ListCategory.shop | ListCategory.todo;
  listName: string;
}
