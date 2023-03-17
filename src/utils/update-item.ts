import { ShoppingListInt, ShoppingListItemInt } from "../models/lists";

const updateAllItems = (updatedItem: ShoppingListItemInt, list: ShoppingListInt) => {
  const update = list.items
    .filter((el) => updatedItem.id !== el.id)
    .concat(updatedItem)
    .sort((a, b) => a.id - b.id);
  return { ...list, items: [...update] };
};

export default updateAllItems;
