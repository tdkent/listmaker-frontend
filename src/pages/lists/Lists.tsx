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
      <section className="lg:mx-auto lg:w-3/5 lg:mt-8">
        <h2>My Lists</h2>
        <p className="mt-6">You haven't created any lists yet!</p>
        <div className="w-fit mt-6">
          <Hyperlink to="/new">Create a new list</Hyperlink>
        </div>
      </section>
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
    <section className="lg:mt-8 lg:w-3/5 lg:mx-auto">
      <h2 className="whitespace-nowrap overflow-hidden text-[19px] lg:text-3xl">
        <span className="">{userNickname ? userNickname + "'s" : "My"}</span>
        <span> Lists</span>
      </h2>
      <div className="mt-4 lg:mt-8 lg:mx-auto lg:w-[40%]">
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
      <div className="my-6 lg:my-8 border-b dark:border-gray-600">
        {sortedList.map((list) => {
          return (
            <Link to={`/lists/${list.listSlug}&id=${list.listId}`} key={list.listId}>
              <div className="flex flex-row justify-between items-center border-t dark:border-gray-600 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 lg:py-6 lg:px-2 lg:text-lg">
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{list.listName}</span>
                  <span className="text-xs lg:text-sm">{list.listType}</span>
                </div>
                <div className="">
                  <CircleEllipsis />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Lists;
