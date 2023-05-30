import { useContext } from "react";

import AuthContext from "../../context/AuthContext";
import Hyperlink from "../forms/Hyperlink";

const ListsOverview = () => {
  const auth = useContext(AuthContext);
  return (
    <section className="my-6 lg:mt-10 pr-2">
      <div className="lg:w-3/5 lg:mx-auto">
        <h3>Create and customize lists to keep track of your goals</h3>
        <div className="mt-4">
          <p className="font-medium">Shopping</p>
          <p className="my-2">
            Add and categorize everything you need to buy for your grocery, supply, and other
            shopping runs!
          </p>
        </div>
        <div className="mt-4">
          <p className="font-medium">To-Do</p>
          <p className="my-2">
            Organize your busy schedule with a list of to-do items. Your to-dos are tracked by due
            date and category, and can be enhanced with optional info such as due time, address,
            recurrence, and subtasks!
          </p>
        </div>
        <div className="mt-4">
          <p className="font-medium">...with more list types coming!</p>
        </div>
      </div>
      <div className={`mt-6 lg:mt-10 ${!auth.isLoggedIn && "border-t"}`}>
        <div className="lg:w-3/5 lg:mx-auto">
          <h4 className="mt-4 text-xl lg:text-2xl font-normal">Ready to get started?</h4>
          <div className="mt-4">
            <p>
              {auth.isLoggedIn ? (
                <Hyperlink to="/new">Create a new list</Hyperlink>
              ) : (
                <Hyperlink to="/register">Create a free account</Hyperlink>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListsOverview;
