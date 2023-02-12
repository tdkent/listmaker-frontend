import ListCategory from "./list-category";

export default interface NewList {
  creatorId: number;
  listName: string;
  listType: ListCategory.shop | ListCategory.todo;
}
