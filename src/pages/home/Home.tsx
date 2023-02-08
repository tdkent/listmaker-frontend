import { useState } from "react";
import { Link } from "react-router-dom";

// import AuthenticateUser from "../../components/auth/AuthenticateUser";
import CreateNewList from "../../components/new-list/CreateNewList";

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
          <CreateNewList />
        </div>
      )}
    </div>
  );
};

export default Home;
