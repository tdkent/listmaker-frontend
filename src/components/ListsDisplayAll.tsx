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
            <p>{list.name}</p>
            <p>Category: {list.category}</p>
            <Link to={`${list.slug}&id=${list.id}`}>Edit List</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ListsDisplayAll;
