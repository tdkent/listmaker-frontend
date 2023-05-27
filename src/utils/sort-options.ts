import { FetchAllListsInt } from "../models/lists";
import { SortListsEnum } from "../models/lists";
import { SortItemsEnum } from "../models/todo";
import { TodoListItemInt } from "../models/todo";

export interface ListSortOptsInt {
  listId: number;
  sort: string;
}

export const listSortOptions = (
  listArray: FetchAllListsInt[],
  sort: string
): FetchAllListsInt[] => {
  switch (sort) {
    case SortListsEnum.c:
      return listArray.sort((a, b) => b.listId - a.listId);
    case SortListsEnum.n: {
      return listArray.sort(function (a, b) {
        if (a.listName.toLowerCase() > b.listName.toLowerCase()) return 1;
        if (a.listName.toLowerCase() < b.listName.toLowerCase()) return -1;
        if (a.listType > b.listType) return 1;
        if (a.listType < b.listType) return -1;
        return 0;
      });
    }
    case SortListsEnum.t:
      return listArray.sort(function (a, b) {
        if (a.listType > b.listType) return 1;
        if (a.listType < b.listType) return -1;
        if (a.listName.toLowerCase() > b.listName.toLowerCase()) return 1;
        if (a.listName.toLowerCase() < b.listName.toLowerCase()) return -1;
        return 0;
      });
    default:
      return listArray;
  }
};

export const itemSortOptions = (listArray: TodoListItemInt[], sort: string): TodoListItemInt[] => {
  switch (sort) {
    case SortItemsEnum.add:
      return listArray.sort((a, b) => b.itemId - a.itemId);
    case SortItemsEnum.cat:
      return listArray.sort(function (a, b) {
        if (a.itemCategory > b.itemCategory) return 1;
        if (a.itemCategory < b.itemCategory) return -1;
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
        if (a.dateDue < b.dateDue) return 1;
        if (a.dateDue > b.dateDue) return -1;
        return 0;
      });
    case SortItemsEnum.dueNew:
      return listArray.sort(function (a, b) {
        if (a.dateDue > b.dateDue) return 1;
        if (a.dateDue < b.dateDue) return -1;
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
        return 0;
      });
    case SortItemsEnum.dueOld:
      return listArray.sort(function (a, b) {
        if (a.dateDue < b.dateDue) return 1;
        if (a.dateDue > b.dateDue) return -1;
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
        return 0;
      });
    case SortItemsEnum.nameAz:
      return listArray.sort(function (a, b) {
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return -1;
        if (a.dateDue > b.dateDue) return 1;
        if (a.dateDue < b.dateDue) return -1;
        return 0;
      });
    case SortItemsEnum.nameZa:
      return listArray.sort(function (a, b) {
        if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) return 1;
        if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) return -1;
        if (a.dateDue > b.dateDue) return 1;
        if (a.dateDue < b.dateDue) return -1;
        return 0;
      });
    default:
      return listArray;
  }
};
