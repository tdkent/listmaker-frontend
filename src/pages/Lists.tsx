import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axios, { Axios, AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import checkLocalStorage from "../utils/check-local-storage";
import { fetchAllLists } from "../api/fetch-lists";
import { AxiosErrorInfoInt } from "../models/errors";

const useLists = (userId: number, token: string) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => fetchAllLists(userId, token),
    // initialData: () => {
    //   const storedData = localStorage.getItem("userData");
    //   return storedData ? JSON.parse(storedData) : null;
    // },
  });
  return { isError, isLoading, lists: data, error: error as AxiosError };
};

const Lists = () => {
  // auth check
  const auth = useContext(AuthContext);
  console.log("auth: ", auth);
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

  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["lists"],
  //   queryFn: () => fetchAllLists(auth.userId as number, auth.token as string),
  // });

  // errors
  // const [resError, setResError] = useState<AxiosErrorInfoInt | null>(null);
  // useEffect(() => {
  //   if (resError) {
  //     toast.error(<ErrorDisplay error={resError} />);
  //   }
  // }, [resError]);
  // if (data && data.statusText !== "OK") {
  //   setResError(data);
  // }

  // conditional rendering
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !lists) {
    return <div>{JSON.stringify(error)}</div>;
  }

  // if (!lists.length) {
  //   return <div>You haven't added any lists yet!</div>;
  // }

  // main render
  return (
    <>
      <div>
        <h2>My Lists</h2>
        <div>
          {lists.map((list) => {
            return (
              <div
                key={list.id}
                style={{ border: "1px dashed aquamarine", margin: "1rem 0", padding: "1rem" }}>
                <h3>{list.name}</h3>
                <span>{list.category}</span>
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
      <ToastContainer />
    </>
  );
};

export default Lists;
