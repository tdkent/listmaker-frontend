import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchAllLists } from "../../api/fetch-lists";
import QueryError from "../../components/errors/QueryError";
import CircleEllipsis from "../../icons/CircleEllipsis";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Hyperlink from "../../components/forms/Hyperlink";

const Lists = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // errors
  const { toggleError, provideData } = useContext(ErrorContext);

  // query
  const userId = auth.userId as number;
  const token = auth.token as string;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => fetchAllLists(token),
    enabled: !!token,
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  // if (!data || !data.length) {
  //   return (
  //     <div>
  //       <h2>My Lists</h2>
  //       <p className="mt-6">You haven't created any lists yet!</p>
  //       <div className="w-fit mt-6">
  //         <Hyperlink to="/new">Create a new list</Hyperlink>
  //       </div>
  //     </div>
  //   );
  // }

  if (!data.length) {
    throw new Error("No list data");
  }

  const userNickname = JSON.parse(localStorage.getItem("userData")!).userNickname;

  return (
    <div>
      <h2>{userNickname ? userNickname + "'s" : "My"} Lists</h2>
      <div className="my-6 border-b">
        {data.map((list) => {
          return (
            <Link to={`/lists/${list.listSlug}&id=${list.listId}`} key={list.listId}>
              <div className="flex flex-row justify-between items-center border-t py-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{list.listName}</span>
                  <span className="text-xs">{list.listType}</span>
                </div>
                <div className="">
                  <CircleEllipsis />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
