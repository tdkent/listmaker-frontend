import { useContext } from "react";

import AuthContext from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";
import ListsOverview from "../../components/page-sections/ListsOverview";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="lg:mt-8">
      <div>
        <div className="lg:w-3/5 lg:mx-auto">
          <h2 className="dark:text-sky-500">Organize your life with powerful listmaking tools</h2>
          {!auth.isLoggedIn && (
            <section className="">
              <h3 className="mt-4 pr-3">Get started with a free account:</h3>
              <RegisterForm />
            </section>
          )}
        </div>
      </div>
      <ListsOverview />
    </div>
  );
};

export default Home;
