import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthContext from "../context/AuthContext";
import { UserInfoInt } from "../models/user";
import Input from "./forms/Input";
import Button from "./forms/Button";
import { UserProfileEnum } from "../models/user";
import { editUserProfile } from "../api/user";

interface EditUserNameInt {
  data: UserInfoInt;
}

const EditUserName = ({ data }: EditUserNameInt) => {
  const auth = useContext(AuthContext);
  const [userName, setUserName] = useState(data.userName);

  const mutation = useMutation({
    mutationFn: (body) => editUserProfile(body),
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!userName) alert("Please enter a username");

    // submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name={UserProfileEnum.email}
          id={UserProfileEnum.email}
          label="Email"
          value={userName}
          handleChange={handleChange}
        />
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default EditUserName;
