import { useActionData, useLoaderData } from "react-router-dom";

import { ShoppingListInt } from "../models/new-list";
import DisplayLists from "../components/lists/DisplayUserLists";

const UserLists = () => {
  const actionData = useActionData();
  console.log("actionData: ", actionData);
  const loaderData = useLoaderData();
  const lists: ShoppingListInt[] = loaderData as ShoppingListInt[];
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
