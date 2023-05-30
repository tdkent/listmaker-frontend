import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import checkLocalStorage from "../../utils/check-local-storage";
import { checkNameLength } from "../../utils/form-validation";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import Button from "../../components/forms/Button";
import { newListTypes, NewListReqInt, NewListResInt, AllListTypesEnum } from "../../models/lists";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { ReducerActionInt } from "../../models/reducers";
import { createNewList } from "../../api/new-list";
import { CustomStylesEnum } from "../../models/styles";

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
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // reducer
  const defaultState = {
    name: "",
    type: "Shopping",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === InputIdsEnum.newListName) {
      return { ...state, name: action.payload };
    }
    if (action.type === InputIdsEnum.newListType) {
      return { ...state, type: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch({ type: e.currentTarget.id, payload: e.currentTarget.value });
  };
  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch({ type: e.currentTarget.id, payload: e.currentTarget.value });
  };

  // mutation
  const mutation = useMutation({
    mutationFn: (body: NewListReqInt) => createNewList(body, auth.token as string),
    onSuccess: (data: NewListResInt) => {
      const { listId, listSlug } = data;
      navigate(`/lists/${listSlug}&id=${listId}`);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form validation
    if (!checkNameLength(state.name)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.newListName);
    }
    // mutate
    const body: NewListReqInt = {
      listName: state.name,
      listType: state.type,
    };
    mutation.mutate(body);
  };

  return (
    <section className="lg:mt-8 lg:w-3/5 lg:mx-auto">
      <h2>Create New List</h2>
      <div className="my-6">
        <Form id={FormIdsEnum.newList} onSubmit={handleSubmit}>
          <Input
            label="Name"
            id={InputIdsEnum.newListName}
            type="text"
            handleChange={handleChange}
            required={true}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameLength}
          />
          <Select
            label="Type"
            id={InputIdsEnum.newListType}
            defaultValue={AllListTypesEnum.shop}
            options={newListTypes}
            handleSelect={handleSelect}
            required={true}
          />
          <Button
            type="submit"
            text="Submit"
            disabled={active}
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
          />
        </Form>
      </div>
    </section>
  );
};

export default NewList;
