import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import AuthContext from "../context/AuthContext";
import checkLocalStorage from "../utils/check-local-storage";
import { fetchList } from "../api/fetch-lists";
import EditListHeader from "../components/EditListHeader";
import EditListAddItem from "../components/EditListAddItem";
import EditListDisplayItems from "../components/EditListDisplayItems";
import EditListDeleteList from "../components/EditListDeleteList";

const EditList = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // params
  const { slug }: { slug: string } = useParams() as { slug: string };
  const listId = Number(slug.split("=")[1]);

  // query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => fetchList(listId),
  });

  // conditional rendering
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    if (error instanceof Error)
      return (
        <div>
          <h2>Error</h2>
          <p>{error.message}</p>
        </div>
      );
  }

  if (!data) {
    return <div>Could not find list data.</div>;
  }

  // main render
  return (
    <>
      <div>
        <EditListHeader token={auth.token!} list={data} />
        <EditListAddItem token={auth.token!} list={data} />
        <EditListDisplayItems token={auth.token!} list={data} />
        <EditListDeleteList token={auth.token!} list={data} />
      </div>
      <ToastContainer />
    </>
  );
};

export default EditList;
