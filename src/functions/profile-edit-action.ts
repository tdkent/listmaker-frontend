import { UserInfoInt } from "../models/user";

export const profileEditAction = async ({ request }: any) => {
  const data = await request.formData();
  const userData: UserInfoInt = {
    id: 1,
    userEmail: data.get("email"),
    userName: data.get("username"),
    userPassword: data.get("password"),
  };
  console.log(userData);
  // send to api, update store
  return null;
};
