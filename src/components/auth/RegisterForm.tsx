import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
// import useValidation from "../../hooks/useValidation";
import { RegisterInputsEnum } from "../../models/auth";
import { FormValidationInt } from "../../models/errors";
import { ReducerActionInt } from "../../models/reducers";
import { CustomStylesEnum } from "../../models/styles";
import { register } from "../../api/auth";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Info from "../../icons/Info";

const RegisterForm = () => {
  // error handling
  const { setFetchError } = useError();
  const [formError, setFormError] = useState<FormValidationInt | null>(null);

  // reducer
  const defaultState = {
    userEmail: "",
    userNickname: "",
    userPassword: "",
    verifyPassword: "",
  };
  const reducer = (state: typeof defaultState, action: ReducerActionInt) => {
    if (action.type === RegisterInputsEnum.email) {
      return { ...state, userEmail: action.payload };
    }
    if (action.type === RegisterInputsEnum.nickname) {
      return { ...state, userNickname: action.payload };
    }
    if (action.type === RegisterInputsEnum.password) {
      return { ...state, userPassword: action.payload };
    }
    if (action.type === RegisterInputsEnum.verify) {
      return { ...state, verifyPassword: action.payload };
    }
    throw new Error(`No matching "${action.type}" action type`);
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  // form validation
  const handleEmailBlur = (e: React.FormEvent<HTMLInputElement>) => {
    // check for valid email
    if (
      !e.currentTarget.value.match(/[@]/) ||
      !e.currentTarget.value.match(/[.]/) ||
      !e.currentTarget.value.match(/[a-zA-Z]/) ||
      e.currentTarget.value.length < 5
    ) {
      console.log("Invalid email");
    }
  };

  // form submission
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => register(state),
    onError: (error: AxiosError) => setFetchError(error),
    onSuccess: () => {
      //? TODO: auto-fill email field on login page
      toast.success("New account created! Please log in.", {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    },
  });
  // const auth = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check for form validation errors
    // TODO: validation error component
    // TODO: replace with better email check regex
    if (!state.userEmail.match(/[@]/)) {
      return setFormError({
        type: RegisterInputsEnum.email,
        message: "Please enter a valid email address.",
      });
    }
    // TODO: additional password checks
    if (state.userPassword.length < 8) {
      return setFormError({
        type: RegisterInputsEnum.password,
        message: "Please enter a password that is 8 or more characters long.",
      });
    }
    if (state.userPassword !== state.verifyPassword) {
      return setFormError({
        type: RegisterInputsEnum.password,
        message: "Passwords do not match. Please try again.",
      });
    }

    // request if no form errors
    mutation.mutate();
  };

  // TODO: form input validation styles
  // TODO: add state that tracks if input has been clicked into.
  // TODO: If it is clicked out of and a valid input is not registered, show error style / text
  // TODO: tool tip for password
  // TODO: add symbols indicating required inputs
  return (
    <div className="my-6">
      <Form id="form-register" onSubmit={handleSubmit}>
        <Input
          label="Email"
          name={RegisterInputsEnum.email}
          type="text"
          id={RegisterInputsEnum.email}
          handleChange={handleChange}
          handleBlur={handleEmailBlur}
          required={true}
        />
        {/* //TODO: Error message component */}
        {formError && formError.type === RegisterInputsEnum.email && (
          <span>{formError.message}</span>
        )}
        <Input
          label="Nickname"
          name={RegisterInputsEnum.nickname}
          type="text"
          id={RegisterInputsEnum.nickname}
          handleChange={handleChange}
          required={false}
        />
        {/* //! TODO: change type to password */}
        <Input
          label="Password"
          name={RegisterInputsEnum.password}
          type="text"
          id={RegisterInputsEnum.password}
          handleChange={handleChange}
          required={true}
        />
        <Input
          label="Verify Password"
          name={RegisterInputsEnum.verify}
          type="text"
          id={RegisterInputsEnum.verify}
          handleChange={handleChange}
          required={true}
        />
        {formError && formError.type === RegisterInputsEnum.password && (
          <span>{formError.message}</span>
        )}
        <Button
          type="submit"
          text="Sign up"
          styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
        />
      </Form>
    </div>
  );
};

export default RegisterForm;
