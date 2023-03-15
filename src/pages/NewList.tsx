import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import slugify from "slugify";

import AuthContext from "../context/AuthContext";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Button from "../components/forms/Button";
import { FormValidationInt } from "../models/errors";
import { newListTypes } from "../models/lists";
import checkLocalStorage from "../utils/check-local-storage";
import { ReducerActionInt } from "../models/reducers";
import { NewListInputsEnum } from "../models/new-list";

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
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // reducer
  const defaultState = {
    listName: "",
    listType: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === NewListInputsEnum.name) {
      setFormError(null);
      return { ...state, listName: action.payload };
    }
    if (action.type === NewListInputsEnum.type) {
      setFormError(null);
      return { ...state, listType: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  // form submission
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  };
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const selection = e.currentTarget.value.toLowerCase().match(/[a-z]/g);
    // check for null selection
    if (selection) {
      dispatch({ type: e.currentTarget.name, payload: selection.join("") });
    }
  };
  // const mutation = useMutation({
  //   mutationFn: () =>
  // })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // form validation
    // TODO: add form validation component
    if (!state.listName) {
      return setFormError({
        type: NewListInputsEnum.name,
        message: "Please enter a name for your new list!",
      });
    }
    if (!state.listType) {
      return setFormError({
        type: NewListInputsEnum.type,
        message: "Please select a type for your new list!",
      });
    }

    // form submission
    // TODO: finish new list form submission
    const list = {
      userId: auth.userId,
      listName: state.listName,
      listType: state.listType,
      slug: slugify(state.listName),
      items: [],
    };
  };

  return (
    <div>
      <h2>Create New List</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name={NewListInputsEnum.name}
            id={NewListInputsEnum.name}
            type="text"
            handleChange={handleChange}
          />
          {formError && formError.type === NewListInputsEnum.name && (
            <span>{formError.message}</span>
          )}
          <Select
            label="Type"
            name={NewListInputsEnum.type}
            id={NewListInputsEnum.type}
            defaultValue=""
            options={newListTypes}
            handleSelect={handleSelect}
          />
          {formError && formError.type === NewListInputsEnum.type && (
            <span>{formError.message}</span>
          )}
          <Button type="submit" text="Create" />
        </form>
      </div>
    </div>
  );
};

export default NewList;
