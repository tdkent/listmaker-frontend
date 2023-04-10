import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchAllLists } from "../../api/fetch-lists";

// TODO: this can be replaced with a useQuery function
const useLists = (userId: number, token: string) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => fetchAllLists(token),
  });
  return { isError, isLoading, lists: data, error: error as AxiosError };
};

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
  const { isLoading, isError, lists, error } = useLists(
    auth.userId as number,
    auth.token as string
  );

  // conditional rendering
  // TODO: add loading component or spinner
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

  if (!lists || !lists.length) {
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
      <div>
        {lists.map((list) => {
          return (
            <div
              key={list.id}
              style={{ border: "1px dashed aquamarine", margin: "1rem 0", padding: "1rem" }}>
              <h3>{list.name}</h3>
              <span>{list.type}</span>
              <div>
                <div style={{ marginTop: "1rem" }}>
                  <Link to={`/lists/${list.slug}&id=${list.id}`}>Edit</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
