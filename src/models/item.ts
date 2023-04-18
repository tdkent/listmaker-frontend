// Shopping List
export interface ShoppingListItemInt {
  id: number;
  listId: number;
  userId: number;
  name: string;
  perm_category: string;
  temp_category: string;
  isChecked: boolean;
}
