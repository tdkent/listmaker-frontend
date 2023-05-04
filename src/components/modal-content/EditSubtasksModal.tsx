import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import ModalContext from "../../context/ModalContext";
import Input from "../forms/Input";
import Button from "../forms/Button";
import Form from "../forms/Form";
import { EditItemFormInputsEnum, SubtaskInt, TodoListItemInt } from "../../models/item";
import { FormIdEnum } from "../../models/form";
import { newSubtask, editSubtask, deleteSubtask } from "../../api/mutate-todo-subtasks";

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
    <div>
      <h4>Subtasks</h4>
      <div>
        <Form id={FormIdEnum.newTask} onSubmit={handleNewSubmit}>
          <Input
            label="Add subtask"
            type="text"
            name={EditItemFormInputsEnum.task}
            id={EditItemFormInputsEnum.task}
            value={newTask}
            handleChange={handleNewChange}
          />
          <Button type="submit" text="+" />
        </Form>
      </div>
      <div>
        <ul>
          {taskList.map((task) => {
            return (
              <div key={task.taskId}>
                {isEditing && task.taskId === taskId ? (
                  <div>
                    <Form id={FormIdEnum.editTask} onSubmit={handleEditSubmit}>
                      <Input
                        label=""
                        type="text"
                        name={EditItemFormInputsEnum.editTask}
                        id={EditItemFormInputsEnum.editTask}
                        value={editTask}
                        handleChange={handleEditChange}
                      />
                      <Button type="submit" text="Save" />
                      <Button type="button" text="Cancel" handleClick={handleEditCancel} />
                    </Form>
                  </div>
                ) : (
                  <div>
                    <li>{task.taskName}</li>
                    <div>
                      <Button
                        type="button"
                        text="edit"
                        handleClick={() => {
                          setIsEditing(true);
                          setTaskId(task.taskId);
                          setEditTask(task.taskName);
                        }}
                      />
                      <Button
                        type="button"
                        text="x"
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
      <div>
        <Button type="button" text="Close" handleClick={handleClose} />
      </div>
    </div>
  );
};

export default EditSubtasksModal;
