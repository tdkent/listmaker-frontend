import { Form } from "react-router-dom";

const CreateNewList = () => {
  return (
    <Form method="post" action="/">
      <label>
        <span>Name:</span>
        <input type="text" name="name" required />
      </label>
      <label>
        <span>Type:</span>
        <select name="type" defaultValue="todo" required>
          <option value="todo">To-Do</option>
          <option value="shopping">Shopping</option>
        </select>
      </label>
      <button>Create</button>
    </Form>
  );
};

export default CreateNewList;
