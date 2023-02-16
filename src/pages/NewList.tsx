import { useState, useContext } from "react";
import { Form, useActionData } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import FormInput from "../components/forms/FormInput";
import Button from "../components/forms/Button";
import { NewListFormErrorInt } from "../models/errors";
import { NewListCategoryEnum } from "../models/new-list";
import { TEST_DB } from "../constants/global";

const NewList = () => {
  const actionData = useActionData();
  const errors: NewListFormErrorInt = actionData as NewListFormErrorInt;

  const [listName, setListName] = useState("");
  const [listCategory, setListCategory] = useState<string | null>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value);
  };
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setListCategory(e.currentTarget.value.toLowerCase());
  };

  const auth = useContext(AuthContext);

  const handleSubmit = async () => {
    const response = await fetch(`${TEST_DB}/lists`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // TODO: Authorization: token
      },
      body: JSON.stringify({
        userId: auth.userId,
        listName,
        listCategory,
      }),
    });
    if (!response.ok) {
      // TODO: error handling
    }
    console.log("Success: ", response);
    // TODO: db returns new list id. Initiate redirect to lists/:listId
  };
  return (
    <div>
      <h2>Create New List</h2>
      <div>
        <Form method="post" action="/new" onSubmit={handleSubmit}>
          <FormInput
            labelText="Name"
            inputName="name"
            inputType="text"
            handleChange={handleChange}
          />
          {errors?.name && <span>{errors.name}</span>}
          <div>
            <label>
              <span>Category:</span>
              <select name="category" defaultValue="" onChange={handleSelect}>
                <option disabled value="">
                  {""}
                </option>
                <option value={NewListCategoryEnum.shop}>
                  {NewListCategoryEnum.shop}
                </option>
                <option value={NewListCategoryEnum.todo}>
                  {NewListCategoryEnum.todo}
                </option>
              </select>
            </label>
          </div>
          {errors?.category && <span>{errors.category}</span>}
          <Button buttonText="Create" buttonType="submit" />
        </Form>
      </div>
    </div>
  );
};

export default NewList;
