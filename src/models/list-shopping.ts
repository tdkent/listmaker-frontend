enum ListCategory {
  shop = "Shopping",
  todo = "To-Do",
}

export default interface ShoppingList {
  id: number;
  creatorId: number;
  listType: ListCategory.shop | ListCategory.todo;
  listName: string;
}
