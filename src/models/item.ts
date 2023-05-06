// Edit Item Form Ids

export enum EditItemFormInputsEnum {
  name = "item-name",
  cat = "item-category",
  date = "item-date",
  time = "item-time",
  loc = "item-location",
  check = "check-item",
  task = "item-subtask",
  editTask = "edit-subtask",
}

export enum CheckedItemEnum {
  check = "_checked",
}

// Edit Item

export interface EditItemReqInt {
  itemId: number;
  listId: number;
  name: string;
  cat: string;
}
