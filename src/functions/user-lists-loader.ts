import { json } from "react-router-dom";

import { TEST_DB } from "../constants/global";

export const userListsLoader = async () => {
  // fetch userId from state
  const response = await fetch(`${TEST_DB}/lists?creatorId=1`);
  if (!response.ok) {
    throw json(
      {
        message: "We are temporarily unable to retrieve your lists.",
      },
      { status: 503 }
    );
  }
  return response.json();
};
