import { Form } from "react-router-dom";

import FormInput from "../components/forms/FormInput";
import Button from "../components/forms/Button";
import ListCategory from "../models/list-category";

const NewList = () => {
  return (
    <div>
      <h2>Create New List</h2>
      <div>
        <Form method="post" action="/new">
          <FormInput labelText="Name:" inputType="text" inputName="name" />
          <div>
            <label>
              <span>Category:</span>
              <select name="category" defaultValue="">
                <option value={ListCategory.shop}>{ListCategory.shop}</option>
                <option value={ListCategory.todo}>{ListCategory.todo}</option>
              </select>
            </label>
          </div>
          <Button buttonText="Create" buttonType="submit" />
        </Form>
      </div>
    </div>
  );
};

export default NewList;
