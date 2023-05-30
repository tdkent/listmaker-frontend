import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../context/ErrorContext";
import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Pencil from "../../icons/Pencil";
import Check from "../../icons/Check";
import Close from "../../icons/Close";
import Trash from "../../icons/Trash";
import { FormIdsEnum, InputIdsEnum, FormErrorsEnum } from "../../models/forms";
import { CustomStylesEnum } from "../../models/styles";
import { SubtaskInt } from "../../models/todo";
import { editSubtask, deleteSubtask } from "../../api/mutate-todo-subtasks";
import { checkNameBlank } from "../../utils/form-validation";

interface Props {
  taskList: SubtaskInt[];
  setTaskList: (value: React.SetStateAction<SubtaskInt[]>) => void;
  token: string;
  itemId: number;
  listId: number;
  isEditing: boolean;
  setIsEditing: (value: React.SetStateAction<boolean>) => void;
}

const EditSubtasksDisplay = ({
  token,
  taskList,
  setTaskList,
  itemId,
  listId,
  isEditing,
  setIsEditing,
}: Props) => {
  // constants
  const queryClient = useQueryClient();

  // errors
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const [isError, setIsError] = useState(false);
  const [errorId, setErrorId] = useState("");

  // state
  const [editTask, setEditTask] = useState<string>("");
  const [taskId, setTaskId] = useState<number>();

  // mutations
  const editMutation = useMutation({
    mutationFn: (taskId: number) => editSubtask(taskId, itemId, editTask, token),
    onSuccess: (data) => {
      setTaskList(data);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => deleteSubtask(taskId, itemId, token),
    onSuccess: (data) => {
      setTaskList(data || []);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  // handlers
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsError(false);
    setEditTask(e.currentTarget.value);
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkNameBlank(editTask)) {
      setIsError(true);
      return setErrorId(InputIdsEnum.todoTaskEdit);
    }
    editMutation.mutate(taskId as number);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setIsError(false);
  };

  return (
    <div>
      <ul>
        {taskList
          .sort((a, b) => a.taskId - b.taskId)
          .map((task) => {
            return (
              <div key={task.taskId}>
                {isEditing && task.taskId === taskId ? (
                  <div className="mb-2.5 border rounded-md px-1.5 py-2">
                    <Form id={FormIdsEnum.editTask} onSubmit={handleEditSubmit}>
                      <Input
                        label="Name"
                        type="text"
                        id={InputIdsEnum.todoTaskEdit}
                        value={editTask}
                        handleChange={handleChange}
                        required={true}
                        isError={isError}
                        errorId={errorId}
                        errorString={FormErrorsEnum.nameBlank}
                      />
                      <div className="flex flex-row justify-end">
                        <Button
                          type="submit"
                          text={<Check styles="w-5 h-5 m-auto" />}
                          styles={`${CustomStylesEnum.btnPrimary} w-16 py-2.5 rounded-lg text-white`}
                        />
                        <Button
                          type="button"
                          text={<Close styles="w-5 h-5 m-auto" />}
                          handleClick={handleEditCancel}
                          styles={`ml-2 w-16 py-2.5 text-white bg-gray-500 hover:bg-gray-600 rounded-md`}
                        />
                      </div>
                    </Form>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-between mb-2.5">
                    <li className="text-[15px] overflow-hidden mr-2 text-justify">
                      {task.taskName}
                    </li>
                    <div className="flex flex-row items-center">
                      <Button
                        type="button"
                        text={<Pencil />}
                        disabled={active}
                        handleClick={() => {
                          setIsError(false);
                          setIsEditing(true);
                          setTaskId(task.taskId);
                          setEditTask(task.taskName);
                        }}
                      />
                      <Button
                        type="button"
                        text={<Trash />}
                        disabled={active}
                        handleClick={() => deleteMutation.mutate(task.taskId)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default EditSubtasksDisplay;
