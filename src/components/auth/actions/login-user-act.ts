import { redirect } from "react-router-dom";

interface LoginUser {
  userEmail: string;
  userPassword: string;
}

export const loginUserAction = async ({ request }: any) => {
  const req = await request.formData();
  const data: LoginUser = {
    userEmail: req.get("email"),
    userPassword: req.get("password"),
  };
  if (!data.userEmail.match(/[@]/)) {
    return { email: "Please enter a valid email address." };
  }
  if (data.userPassword.length < 4) {
    return {
      password: "Please enter a password that is 4 or more characters long.",
    };
  }
  // post request made to db to check user credentials
  // if they pass, user's id and token sent. Id is used to redirect to user's list page
  return redirect("/my-lists/1");
};
