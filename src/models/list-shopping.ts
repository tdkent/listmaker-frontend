enum ListCategory {
  shop = "SHOP",
  todo = "TODO",
}

export default interface ShoppingList {
  id: number;
  creatorId: number;
  listType: ListCategory.shop | ListCategory.todo;
  listName: string;
}
