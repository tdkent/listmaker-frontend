import { redirect } from "react-router-dom";

import { TEST_DB } from "../constants/global";
import NewList from "../models/list-new";

export const createNewListAction = async ({ request }: any) => {
  const data = await request.formData();
  // userId provided from state
  const formData: NewList = {
    creatorId: 1,
    listName: data.get("name"),
    listType: data.get("category"),
  };
  const response = await fetch(`${TEST_DB}/lists`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
    }),
  });
  console.log("server response", response);
  // redirect to edit list page after fetching the new list's id
  return redirect("/lists");
};
