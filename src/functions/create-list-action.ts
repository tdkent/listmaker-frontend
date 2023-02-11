import { redirect } from "react-router-dom";

interface NewList {
  creatorId: number;
  listName: string;
  listType: string;
}

export const createNewListAction = async ({ request }: any) => {
  const data = await request.formData();
  let tempCreatorId: number = Math.ceil(Math.random() * 100000);
  const formData: NewList = {
    creatorId: tempCreatorId,
    listName: data.get("name"),
    listType: data.get("type"),
  };
  const response = await fetch("http://localhost:4000/lists", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
    }),
  });
  console.log("server response", response);
  return redirect("/about");
};
