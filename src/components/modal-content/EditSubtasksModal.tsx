import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../context/ErrorContext";
import ModalContext from "../../context/ModalContext";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Form from "../forms/Form";
import { SubtaskInt, TodoListItemInt } from "../../models/todo";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { newSubtask } from "../../api/mutate-todo-subtasks";
import { CustomStylesEnum } from "../../models/styles";
import { checkNameBlank } from "../../utils/form-validation";
import EditSubtasksDisplay from "./EditSubtasksDisplay";

interface EditSubtasksModalProps {
  token: string;
  listId: number;
  itemId: number;
  items: TodoListItemInt[];
  tasks: SubtaskInt[];
}

const EditSubtasksModal = ({ token, listId, itemId, items, tasks }: EditSubtasksModalProps) => {
  // constants
  const queryClient = useQueryClient();
  const modal = useContext(ModalContext);

  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // state
  const [newTask, setNewTask] = useState<string>("");
  const [taskList, setTaskList] = useState<SubtaskInt[]>(tasks);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // mutation
  const newMutation = useMutation({
    mutationFn: () => newSubtask(itemId, listId, newTask, token),
    onSuccess: (data) => {
      setTaskList(data);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  // handlers
  const handleNewChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    setIsEditing(false);
    setNewTask(e.currentTarget.value);
  };

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkNameBlank(newTask)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.todoTaskName);
    }
    newMutation.mutate();
    setNewTask("");
  };

  const handleClose = () => {
    setIsError(false);
    toggleError(false);
    provideData(null);
    modal.provideId("");
    modal.toggleModal(false);
  };

  return (
    <div className="mt-2 mb-6 text-sm">
      <div className="flex items-center justify-between text-center px-3 pb-2 border-b">
        <div className="text-left grow shrink basis-0">
          <Button type="button" text="Close" handleClick={handleClose} divStyles="text-left" />
        </div>
        <h6>Subtasks</h6>
        <div className="grow shrink basis-0" />
      </div>
      <div className="my-4 pb-4 border-b text-base">
        <Form id={FormIdsEnum.newTask} onSubmit={handleNewSubmit}>
          <Input
            label="Name"
            type="text"
            id={InputIdsEnum.todoTaskName}
            value={newTask}
            handleChange={handleNewChange}
            required={true}
            isError={isError}
            errorId={errorId}
            errorString={FormErrorsEnum.nameBlank}
          />
          <Button
            type="submit"
            text="Add"
            disabled={active}
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
          />
        </Form>
      </div>
      <EditSubtasksDisplay
        token={token}
        taskList={taskList}
        setTaskList={setTaskList}
        itemId={itemId}
        listId={listId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default EditSubtasksModal;
