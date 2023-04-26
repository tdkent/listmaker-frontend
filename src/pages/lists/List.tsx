import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import checkLocalStorage from "../../utils/check-local-storage";
import { fetchList } from "../../api/fetch-lists";
import QueryError from "../../components/errors/queryError";
import EditList from "../../components/edit-list/EditList";
import NewItem from "../../components/edit-list/NewItem";
import NewShoppingItem from "../../components/edit-list/shopping/NewShoppingItem";
import EditShoppingItem from "../../components/edit-list/shopping/EditShoppingItem";
import NewTodoItem from "../../components/edit-list/to-do/NewTodoItem";
import EditTodoItem from "../../components/edit-list/to-do/EditTodoItem";
import DeleteList from "../../components/edit-list/DeleteList";
import { AllListTypesEnum } from "../../models/lists";
import { ShoppingListItemInt, TodoListItemInt } from "../../models/item";

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
    return <QueryError error={error} />;
  }

  //? TODO: how to handle this scenario?
  if (!data) {
    return <div>Could not find list data.</div>;
  }

  // main render
  return (
    <div>
      <EditList token={token} id={data.id} name={data.name} />
      {/* <NewItem token={token} id={data.id} /> */}
      {/* Shopping */}
      {data.type === AllListTypesEnum.shop && (
        <>
          <NewShoppingItem token={token} listId={data.id} />
          <EditShoppingItem
            token={token}
            listId={data.id}
            type={data.type}
            items={data.items as ShoppingListItemInt[]}
          />
        </>
      )}
      {/* To-Do */}
      {data.type === AllListTypesEnum.todo && (
        <>
          <NewTodoItem token={token} listId={data.id} />
          <EditTodoItem
            token={token}
            listId={data.id}
            type={data.type}
            items={data.items as TodoListItemInt[]}
          />
        </>
      )}
      <DeleteList token={token} id={data.id} />
    </div>
  );
};

export default List;
