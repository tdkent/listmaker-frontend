import User from "../models/user";

export const profileEditAction = async ({ request }: any) => {
  const data = await request.formData();
  const userData: User = {
    id: 1,
    userEmail: data.get("email"),
    userName: data.get("username"),
  };
  console.log(userData);
  // send to api, update store
  return null;
};
