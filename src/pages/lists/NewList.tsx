import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import useError from "../../hooks/useError";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import Button from "../../components/forms/Button";
import { FormValidationInt } from "../../models/errors";
import {
  newListTypes,
  NewListFormEnum,
  NewListReqInt,
  NewListResInt,
  AllListTypesEnum,
} from "../../models/lists";
import checkLocalStorage from "../../utils/check-local-storage";
import { ReducerActionInt } from "../../models/reducers";
import { createNewList } from "../../api/new-list";

const NewList = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // errors
  const { setFetchError } = useError();
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // reducer
  const defaultState = {
    name: "",
    type: "Shopping",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === NewListFormEnum.name) {
      setFormError(null);
      return { ...state, name: action.payload };
    }
    if (action.type === NewListFormEnum.type) {
      setFormError(null);
      return { ...state, type: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  console.log("state: ", state);

  // form submission
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  };
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    // check for null selection
    if (e.currentTarget.value) {
      dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
    }
  };
  const mutation = useMutation({
    mutationFn: (body: NewListReqInt) => createNewList(body, auth.token as string),
    onSuccess: (data: NewListResInt) => {
      const { id, slug } = data.list;
      navigate(`/lists/${slug}&id=${id}`);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    // TODO: add form validation component
    if (!state.name) {
      return setFormError({
        type: NewListFormEnum.name,
        message: "Please enter a name for your new list!",
      });
    }
    // if (!state.type) {
    //   return setFormError({
    //     type: NewListFormEnum.type,
    //     message: "Please select a type for your new list!",
    //   });
    // }

    // form submission
    const body: NewListReqInt = {
      listName: state.name,
      listType: state.type,
    };
    mutation.mutate(body);
  };

  return (
    <div>
      <h2>Create New List</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name={NewListFormEnum.name}
            id={NewListFormEnum.name}
            type="text"
            handleChange={handleChange}
          />
          {formError && formError.type === NewListFormEnum.name && <span>{formError.message}</span>}
          <Select
            label="Type"
            name={NewListFormEnum.type}
            id={NewListFormEnum.type}
            defaultValue={AllListTypesEnum.shop}
            options={newListTypes}
            handleSelect={handleSelect}
          />
          {formError && formError.type === NewListFormEnum.type && <span>{formError.message}</span>}
          <Button type="submit" text="Create" />
        </form>
      </div>
    </div>
  );
};

export default NewList;
