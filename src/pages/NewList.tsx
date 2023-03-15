import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";

import AuthContext from "../context/AuthContext";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Button from "../components/forms/Button";
import { FormValidationInt } from "../models/errors";
import { newListTypes, NewListInputsEnum, NewListInt } from "../models/lists";
import checkLocalStorage from "../utils/check-local-storage";
import { ReducerActionInt } from "../models/reducers";
import { createNewList } from "../api/new-list";
import ToastError from "../components/ToastError";

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
  const [responseError, setResponseError] = useState<AxiosError>();
  useEffect(() => {
    if (responseError) {
      toast.error(<ToastError error={responseError} />, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [responseError]);

  // reducer
  const defaultState = {
    name: "",
    type: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === NewListInputsEnum.name) {
      setFormError(null);
      return { ...state, name: action.payload };
    }
    if (action.type === NewListInputsEnum.type) {
      setFormError(null);
      return { ...state, type: action.payload };
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
  const mutation = useMutation({
    mutationFn: (body: NewListInt) => createNewList(auth.token as string, body),
    onSuccess: (data) => {
      navigate(`/lists/${data.slug}&id=${data.id}`);
    },
    onError: (error: AxiosError) => setResponseError(error),
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    // TODO: add form validation component
    if (!state.name) {
      return setFormError({
        type: NewListInputsEnum.name,
        message: "Please enter a name for your new list!",
      });
    }
    if (!state.type) {
      return setFormError({
        type: NewListInputsEnum.type,
        message: "Please select a type for your new list!",
      });
    }

    // submit
    const body: NewListInt = {
      userId: auth.userId as number,
      name: state.name,
      type: state.type,
      slug: slugify(state.name.toLowerCase()),
      items: [],
    };
    mutation.mutate(body);
  };

  return (
    <>
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
      <ToastContainer />
    </>
  );
};

export default NewList;
