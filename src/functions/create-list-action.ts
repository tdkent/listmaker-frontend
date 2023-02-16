import { NewListActionInt } from "../models/new-list";

export const createNewListAction = async ({ request }: any) => {
  const data = await request.formData();
  const formData: NewListActionInt = {
    listName: data.get("name"),
    listCategory: data.get("category"),
  };
  if (!formData.listName) {
    return { name: "Please enter a list name." };
  }
  if (!formData.listCategory) {
    return { category: "Please select a category." };
  }
  return null;
};
