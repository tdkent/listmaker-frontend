import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { ListInt } from "../models/new-list";
import ListsDisplayAll from "../components/ListsDisplayAll";

const UserLists = () => {
  const loaderData = useLoaderData();
  const lists: ListInt[] = loaderData as ListInt[];

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth.isLoggedIn]);

  return (
    <div>
      <h2>My Lists</h2>
      {lists.length ? (
        <ListsDisplayAll lists={lists} />
      ) : (
        <p>You haven't created any lists yet! Get started now:</p>
      )}
    </div>
  );
};

export default UserLists;
