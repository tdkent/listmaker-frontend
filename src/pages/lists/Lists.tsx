import { useContext, useEffect, useState } from "react";
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
import Select from "../../components/forms/Select";
import { InputIdsEnum } from "../../models/forms";
import { listSortOptions } from "../../utils/sort-options";
import { SortListsEnum } from "../../models/lists";

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

  // state
  const [sort, setSort] = useState(localStorage.getItem("listSortPref") || "Created");
  console.log("sort: ", sort);
  console.log(localStorage.getItem("listSortPref"));

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

  if (!data || !data.length) {
    return (
      <div>
        <h2>My Lists</h2>
        <p className="mt-6">You haven't created any lists yet!</p>
        <div className="w-fit mt-6">
          <Hyperlink to="/new">Create a new list</Hyperlink>
        </div>
      </div>
    );
  }

  // display options
  const userNickname = JSON.parse(localStorage.getItem("userData")!).userNickname;
  const sortedList = listSortOptions([...data], sort);

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setSort(e.currentTarget.value);
    localStorage.setItem("listSortPref", e.currentTarget.value);
  };

  return (
    <div>
      <h2>{userNickname ? userNickname + "'s" : "My"} Lists</h2>
      <div className="mt-4">
        <Select
          id={InputIdsEnum.myListsSort}
          label="Sort By:"
          required={false}
          defaultValue={sort}
          options={Object.values(SortListsEnum)}
          handleSelect={handleSelect}
          flex={true}
        />
      </div>
      <div className="my-6 border-b">
        {sortedList.map((list) => {
          return (
            <Link to={`/lists/${list.listSlug}&id=${list.listId}`} key={list.listId}>
              <div className="flex flex-row justify-between items-center border-t py-4 hover:bg-gray-50">
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
