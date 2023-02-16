import { useLoaderData } from "react-router-dom";

import { ShoppingListInt } from "../models/new-list";

const EditList = () => {
  const data = useLoaderData();
  const listData: ShoppingListInt = (data as ShoppingListInt[])[0];
  console.log("listData: ", listData);
  return (
    <div>
      <div>
        <h2>{listData.listName}</h2>
        <h3>{listData.listCategory}</h3>
      </div>
      <div>{/* form for editing list here */}</div>
    </div>
  );
};

export default EditList;
