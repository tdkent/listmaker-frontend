import { useContext } from "react";

import AuthContext from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";
import Hyperlink from "../../components/forms/Hyperlink";
import ListsOverview from "../../components/page-sections/ListsOverview";
import { CustomStylesEnum } from "../../models/styles";

// TODO: add list descriptions section below the register form

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <section className="pr-3">
        <h2>Organize your life with powerful listmaking tools</h2>
      </section>
      {!auth.isLoggedIn && (
        <section className="border-b">
          <h3 className="mt-4 pr-3">Get started by creating a free account:</h3>
          <RegisterForm />
          <p className="mb-6 pl-1">
            Already have an account? <Hyperlink to="/login">Log in</Hyperlink>
          </p>
        </section>
      )}
      <ListsOverview />
    </div>
  );
};

export default Home;
