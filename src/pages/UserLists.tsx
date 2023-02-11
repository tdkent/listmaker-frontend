import { useLoaderData } from "react-router-dom";

import ShoppingList from "../models/list-shopping";
import DisplayLists from "../components/lists/DisplayUserLists";

const UserLists = () => {
  const loaderData = useLoaderData();
  const lists: ShoppingList[] = loaderData as ShoppingList[];
  console.log("lists: ", lists);

  return (
    <div>
      <h2>My Lists</h2>
      {lists.length ? (
        <DisplayLists lists={lists} />
      ) : (
        <p>You haven't created any lists yet! Get started now:</p>
      )}
    </div>
  );
};

export default UserLists;
