import { json } from "react-router-dom";

import { TEST_DB } from "../../../constants/global";

export const myListsLoader = async ({ params }: any) => {
  const { userId }: { userId: number } = params;
  const response = await fetch(`${TEST_DB}/lists?creatorId=${userId}`);
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
