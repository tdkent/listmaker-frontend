import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchList } from "../../api/fetch-lists";
import EditName from "../../components/edit-list/EditName";
import AddItem from "../../components/edit-list/AddItem";
import EditItems from "../../components/edit-list/EditItems";
import DeleteList from "../../components/edit-list/DeleteList";

const List = () => {
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

  // errors
  const { setFetchError } = useError();

  // query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => fetchList(listId),
    onError: (error: AxiosError) => setFetchError(error),
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
    <div>
      <EditName token={auth.token!} list={data} />
      <AddItem token={auth.token!} list={data} />
      <EditItems token={auth.token!} list={data} />
      <DeleteList token={auth.token!} list={data} />
      <ToastContainer />
    </div>
  );
};

export default List;
