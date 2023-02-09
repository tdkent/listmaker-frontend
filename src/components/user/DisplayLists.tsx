import ShoppingList from "../../models/list-shopping";

interface DisplayListsProps {
  lists: ShoppingList[];
}

const DisplayLists = ({ lists }: DisplayListsProps) => {
  return (
    <div>
      {lists.map((list) => {
        return (
          <div key={list.id}>
            <p>{list.listName}</p>
            <p>Category: {list.listType}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayLists;
