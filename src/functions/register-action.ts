import { redirect, json } from "react-router-dom";

import { TEST_DB } from "../constants/global";
import RegisterUser from "../models/register-user";

export const registerUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: RegisterUser = {
    userEmail: req.get("email"),
    userName: req.get("username"),
    userPassword: req.get("password"),
    verifyPassword: req.get("verify-password"),
  };
  if (!data.userEmail.match(/[@]/)) {
    return { email: "Please enter a valid email address." };
  }
  if (!data.userName || data.userName.length < 4) {
    return {
      username: "Please enter a username that is 4 or more characters long.",
    };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Please enter a password that is 4 or more characters long.",
    };
  }
  if (data.userPassword !== data.verifyPassword) {
    return { password: "Passwords do not match. Please try again." };
  }
  const postRes = await fetch(`${TEST_DB}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: data.userEmail,
      userName: data.userName,
      userPassword: data.userPassword,
    }),
  });
  if (!postRes.ok) {
    throw json(
      {
        message:
          "An unknown error occurred. The remote server may be experiencing a temporary outage. Please try again later.",
      },
      { status: 503 }
    );
  }
  // fetch new idea from db, add to state.
  return redirect(`/lists`);
};
