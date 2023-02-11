import { Link } from "react-router-dom";
import slugify from "slugify";

import ShoppingList from "../../models/list-shopping";

interface DisplayUserListsProps {
  lists: ShoppingList[];
}

const DisplayUserLists = ({ lists }: DisplayUserListsProps) => {
  return (
    <div>
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <p>{list.listName}</p>
            <p>Category: {list.listType}</p>
            <Link to={`${slugify(list.listName.toLowerCase())}&id=${list.id}`}>
              Edit List
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUserLists;
