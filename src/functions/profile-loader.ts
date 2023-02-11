import { TEST_DB } from "../constants/global";

export const profileLoader = async () => {
  // user's id is grabbed from state object
  const response = await fetch(`${TEST_DB}/users?id=1`);
  return response.json();
};
