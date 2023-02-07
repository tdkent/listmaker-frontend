import { useState } from "react";
import { Link, Form } from "react-router-dom";

// import AuthenticateUser from "../../components/auth/AuthenticateUser";

const Home = () => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <h2>Welcome to ListMaker!</h2>
      <p>
        Create and edit lists. Share your lists with your friends. Complete
        to-do and shopping tasks, and keep up with your assignments!
      </p>
      {/* <AuthenticateUser /> */}
      <div>
        <button onClick={() => setModal((prev) => !prev)}>+ New List</button>
        <Link to="/my-lists">Go to my lists</Link>
      </div>
      {modal && (
        <div>
          <h4>New List</h4>
          <Form method="post" action="/">
            <label>
              <span>Name:</span>
              <input type="text" name="name" />
            </label>
            <button>Create</button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Home;

export const newListAction = async ({ request }: any) => {
  const data = await request.formData();
  const formData = {
    creatorId: 1,
    listName: data.get("name"),
  };
  const response = await fetch("http://localhost:4000/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creatorId: formData.creatorId,
      listId: 3,
      listName: formData.listName,
    }),
  });
  console.log("server response: ", response);
  return null;
};
