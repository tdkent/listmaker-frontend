import { TEST_DB } from "../../../constants/global";

export const myListsLoader = async () => {
  // variable userId to be accessed from context object
  const userId = 1;
  const response = await fetch(`${TEST_DB}/lists?creatorId=${userId}`);
  console.log("response: ", response);
  return null;
};
