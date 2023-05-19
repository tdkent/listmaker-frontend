import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import ModalContext from "../../context/ModalContext";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Form from "../forms/Form";
import { EditItemFormInputsEnum } from "../../models/item";
import { SubtaskInt, TodoListItemInt } from "../../models/todo";
import { FormIdEnum } from "../../models/form";
import { newSubtask, editSubtask, deleteSubtask } from "../../api/mutate-todo-subtasks";
import { CustomStylesEnum } from "../../models/styles";
import Pencil from "../../icons/Pencil";
import Trash from "../../icons/Trash";
import Check from "../../icons/Check";
import Close from "../../icons/Close";

interface EditSubtasksModalProps {
  token: string;
  listId: number;
  itemId: number;
  items: TodoListItemInt[];
  tasks: SubtaskInt[];
}

const EditSubtasksModal = ({ token, listId, itemId, items, tasks }: EditSubtasksModalProps) => {
  const queryClient = useQueryClient();
  const { setFetchError } = useError();
  const modal = useContext(ModalContext);
  // state
  const [newTask, setNewTask] = useState<string>("");
  const [editTask, setEditTask] = useState<string>("");
  const [taskId, setTaskId] = useState<number>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<SubtaskInt[]>(tasks);

  // mutation function
  const newMutation = useMutation({
    mutationFn: () => newSubtask(itemId, listId, newTask, token),
    onSuccess: (data) => {
      setTaskList(data);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });

  const editMutation = useMutation({
    mutationFn: (taskId: number) => editSubtask(taskId, itemId, editTask, token),
    onSuccess: (data) => {
      setTaskList(data);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => deleteSubtask(taskId, itemId, token),
    onSuccess: (data) => {
      setTaskList(data || []);
      queryClient.invalidateQueries(["list", listId]);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });

  // handler functions
  const handleNewChange = (e: React.FormEvent<HTMLInputElement>) =>
    setNewTask(e.currentTarget.value);

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditChange = (e: React.FormEvent<HTMLInputElement>) =>
    setEditTask(e.currentTarget.value);

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newMutation.mutate();
    setNewTask("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editMutation.mutate(taskId as number);
    setIsEditing(false);
  };

  const handleClose = () => {
    modal.provideId("");
    modal.toggleModal(false);
  };

  return (
    <div className="mt-2 mb-6">
      <div className="text-center pb-2 border-b">
        <h6 className="text-lg">Subtasks</h6>
      </div>
      <div className="my-4 pb-4 border-b">
        {/* <p className="text-center">New Subtask</p> */}
        <Form id={FormIdEnum.newTask} onSubmit={handleNewSubmit}>
          <Input
            label="New Subtask"
            type="text"
            name={EditItemFormInputsEnum.task}
            id={EditItemFormInputsEnum.task}
            value={newTask}
            handleChange={handleNewChange}
            required={false}
          />
          <Button
            type="submit"
            text="Add"
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary} mt-0`}
          />
        </Form>
      </div>
      <div className="">
        {taskList.length ? (
          <ul>
            {taskList
              .sort((a, b) => a.taskId - b.taskId)
              .map((task) => {
                return (
                  <div key={task.taskId}>
                    {isEditing && task.taskId === taskId ? (
                      <div className="mb-2.5">
                        <Form id={FormIdEnum.editTask} onSubmit={handleEditSubmit}>
                          <Input
                            label=""
                            type="text"
                            name={EditItemFormInputsEnum.editTask}
                            id={EditItemFormInputsEnum.editTask}
                            value={editTask}
                            handleChange={handleEditChange}
                            required={false}
                          />
                          <div className="flex flex-row justify-end ">
                            <Button
                              type="submit"
                              text={<Check styles="w-5 h-5 m-auto" />}
                              styles={`${CustomStylesEnum.btnPrimary} w-16 py-2.5 rounded-lg text-white`}
                            />
                            <Button
                              type="button"
                              text={<Close styles="w-5 h-5 m-auto" />}
                              handleClick={handleEditCancel}
                              styles={`${CustomStylesEnum.btnWarning} ml-2 w-16 py-2.5 rounded-lg text-white`}
                            />
                          </div>
                        </Form>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-between mb-2.5">
                        <li className="text-[15px]">{task.taskName}</li>
                        <div className="flex flex-row items-center">
                          <Button
                            type="button"
                            text={<Pencil styles="w-5 h-5 stroke-gray-600 mr-1 mt-1" />}
                            handleClick={() => {
                              setIsEditing(true);
                              setTaskId(task.taskId);
                              setEditTask(task.taskName);
                            }}
                          />
                          <Button
                            type="button"
                            text={<Trash />}
                            handleClick={() => deleteMutation.mutate(task.taskId)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </ul>
        ) : (
          <p className="text-center italic">This item has no subtasks</p>
        )}
      </div>
      <div>
        <Button
          type="button"
          text="Close"
          handleClick={handleClose}
          styles="w-full my-6 font-semibold"
        />
      </div>
    </div>
  );
};

export default EditSubtasksModal;
