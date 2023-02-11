import { useLoaderData } from "react-router-dom";

import ShoppingList from "../models/list-shopping";

const EditList = () => {
  const data = useLoaderData();
  const listData: ShoppingList = (data as ShoppingList[])[0];
  console.log("listData: ", listData);
  return (
    <div>
      <div>
        <h2>{listData.listName}</h2>
        <h3>{listData.listType}</h3>
      </div>
      <div>{/* form for editing list here */}</div>
    </div>
  );
};

export default EditList;
