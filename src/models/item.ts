// Edit Item Form Ids
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
