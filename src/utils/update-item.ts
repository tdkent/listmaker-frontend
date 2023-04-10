import { ShoppingListInt } from "../models/lists";

// TODO: type updatedItem
const updateAllItems = (updatedItem: any, list: ShoppingListInt) => {
  const update = list.items
    .filter((el) => updatedItem.id !== el.id)
    .concat(updatedItem)
    .sort((a, b) => a.id - b.id);
  return { ...list, items: [...update] };
};

export default updateAllItems;
