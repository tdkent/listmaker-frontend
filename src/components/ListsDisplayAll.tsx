import { Link } from "react-router-dom";

import { ListInt } from "../models/new-list";

interface DisplayUserListsProps {
  lists: ListInt[];
}

const ListsDisplayAll = ({ lists }: DisplayUserListsProps) => {
  return (
    <div>
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <p>{list.listName}</p>
            <p>Category: {list.listCategory}</p>
            <Link to={`${list.slug}&id=${list.id}`}>Edit List</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ListsDisplayAll;
