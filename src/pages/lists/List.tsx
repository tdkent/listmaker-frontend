import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchList } from "../../api/fetch-lists";
import EditList from "../../components/edit-list/EditList";
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
  const { slug } = useParams() as { slug: string };
  const listId = Number(slug.split("=")[1]);
  const token = auth.token as string;

  // errors
  const { setFetchError } = useError();

  // query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => fetchList(listId, token),
    enabled: !!token,
    onError: (error: AxiosError) => setFetchError(error),
  });

  // conditional rendering
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO: standardize on-page error info
    //! Note that server errors are being routed to RootError
    return (
      <div>
        <h2>There was an error!</h2>
        {error.response && (
          <p>
            {error.response.status} {error.response.statusText}
          </p>
        )}
        <p>{error.message}</p>
        <p>Our internal server is temporarily unavailable. Please try again later.</p>
      </div>
    );
  }

  //? TODO: how to handle this scenario?
  if (!data) {
    return <div>Could not find list data.</div>;
  }

  // main render
  return (
    <div>
      <EditList token={token} id={data.id} name={data.name} />
      <AddItem token={token} id={data.id} />
      <EditItems token={token} id={data.id} type={data.type} items={data.items} />
      <DeleteList token={token} id={data.id} />
    </div>
  );
};

export default List;
