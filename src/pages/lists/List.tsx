import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchList } from "../../api/fetch-lists";
import QueryError from "../../components/errors/QueryError";
import NullDataError from "../../components/errors/NullDataError";
import EditList from "../../components/edit-list/EditList";
import NewShoppingItem from "../../components/edit-list/shopping/NewShoppingItem";
import EditShoppingItem from "../../components/edit-list/shopping/EditShoppingItem";
import NewTodoItem from "../../components/edit-list/to-do/NewTodoItem";
import EditTodoItem from "../../components/edit-list/to-do/EditTodoItem";
import { AllListTypesEnum } from "../../models/lists";
import { TodoListItemInt } from "../../models/todo";
import { ShoppingListItemInt } from "../../models/shopping";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

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
  const id = Number(slug.split("=")[1]);
  const token = auth.token as string;

  // errors
  const { toggleError, provideData } = useContext(ErrorContext);
  // query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["list", id],
    queryFn: () => fetchList(id, token),
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

  if (!data) {
    return <NullDataError />;
  }

  const { listId, listName, listType } = data;

  // main render
  return (
    <section className="mt-8 lg:w-4/5 lg:mx-auto">
      <EditList token={token} listId={listId} listName={listName} />
      <div className="lg:w-3/4 lg:mx-auto">
        {/* Shopping */}
        {listType === AllListTypesEnum.shop && (
          <>
            <NewShoppingItem token={token} listId={listId} />
            <EditShoppingItem
              token={token}
              listId={listId}
              items={data.items as ShoppingListItemInt[]}
            />
          </>
        )}
        {/* To-Do */}
        {listType === AllListTypesEnum.todo && (
          <>
            <NewTodoItem token={token} listId={listId} />
            <EditTodoItem
              token={token}
              listId={listId}
              listType={listType}
              items={data.items as TodoListItemInt[]}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default List;
