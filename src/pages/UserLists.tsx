import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AuthContext from "../context/AuthContext";
// import { ListInt } from "../models/new-list";
// import ListsDisplayAll from "../components/ListsDisplayAll";
import checkLocalStorage from "../functions/check-local-storage";
import { fetchAllLists } from "../api/fetch-lists";

const UserLists = () => {
  // auth check
  const auth = useContext(AuthContext);
  console.log("auth: ", auth);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // const loaderData = useLoaderData();
  // const lists: ListInt[] = loaderData as ListInt[];
  // const response = useQuery({
  //   queryKey: ["lists"],
  //   queryFn: () => fetchAllLists(auth.userId),
  // });

  return (
    <div>
      <h2>My Lists</h2>
      {/* {lists.length ? <ListsDisplayAll lists={lists} /> : <p>You haven't created any lists yet!</p>} */}
    </div>
  );
};

export default UserLists;
