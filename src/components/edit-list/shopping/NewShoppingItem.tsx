import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../../context/ErrorContext";
import { newShoppingItem } from "../../../api/mutate-shopping-items";
import Input from "../../forms/Input";
import Button from "../../forms/Button";
import Form from "../../forms/Form";
import { CustomStylesEnum } from "../../../models/styles";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../../models/forms";
import { checkNameBlank } from "../../../utils/form-validation";

interface NewShoppingItemProps {
  token: string;
  listId: number;
}

const NewShoppingItem = ({ token, listId }: NewShoppingItemProps) => {
  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // mutation
  const [itemName, setItemName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => newShoppingItem(listId, itemName, token),
    onSuccess: () => {
      setItemName("");
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItemName(e.currentTarget.value);
    setIsError(false);
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // form validation
    if (!checkNameBlank(itemName)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.newShopName);
    }
    // mutate
    mutation.mutate();
  };
  return (
    <div className="my-6 lg:my-8">
      <div className="lg:mx-auto">
        <Form id={FormIdsEnum.newShopItem} onSubmit={submitHandler}>
          <Input
            label="Name"
            type="text"
            id={InputIdsEnum.newShopName}
            value={itemName}
            required={true}
            handleChange={handleChange}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameBlank}
          />
          <Button
            type="submit"
            text="Add Item"
            disabled={active}
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-2`}
          />
        </Form>
      </div>
    </div>
  );
};

export default NewShoppingItem;
