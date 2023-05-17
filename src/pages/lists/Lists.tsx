import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchAllLists } from "../../api/fetch-lists";
import useError from "../../hooks/useError";
import QueryError from "../../components/errors/queryError";
import Pencil from "../../icons/Pencil";

const Lists = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // query
  const { setFetchError } = useError();
  const userId = auth.userId as number;
  const token = auth.token as string;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => fetchAllLists(token),
    enabled: !!token,
    onError: (error: AxiosError) => setFetchError(error),
  });

  // conditional rendering
  // TODO: add loading component or spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  if (!data || !data.length) {
    return (
      <div>
        <h2>My Lists</h2>
        <p>You haven't created any lists yet!</p>
        <Link to="/new">Create New List</Link>
      </div>
    );
  }

  // main render
  return (
    <div>
      <h2>My Lists</h2>
      <div className="my-6 border-b">
        {data.map((list) => {
          return (
            <div
              key={list.listId}
              className="flex flex-row justify-between items-center border-t py-4">
              <div className="flex flex-col">
                <span className="font-semibold">{list.listName}</span>
                <span className="text-xs">{list.listType}</span>
              </div>
              <div className="">
                <Link to={`/lists/${list.listSlug}&id=${list.listId}`}>
                  <Pencil />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
