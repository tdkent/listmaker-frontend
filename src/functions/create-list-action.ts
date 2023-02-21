import { NewListActionInt } from "../models/new-list";

export const createNewListAction = async ({ request }: any) => {
  const data = await request.formData();
  const formData: NewListActionInt = {
    name: data.get("name"),
    category: data.get("category"),
  };
  if (!formData.name) {
    return { name: "Please enter a list name." };
  }
  if (!formData.category) {
    return { category: "Please select a category." };
  }
  return null;
};
