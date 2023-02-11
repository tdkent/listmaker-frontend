import { TEST_DB } from "../constants/global";

export const editListLoader = async ({ params }: any) => {
  const { listName }: { listName: string } = params;
  const listId = Number(listName.split("=")[1]);
  const response = await fetch(`${TEST_DB}/lists?id=${listId}`);
  return response.json();
};
