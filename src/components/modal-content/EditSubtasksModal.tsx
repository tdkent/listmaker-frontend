import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../hooks/useError";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { EditItemFormInputsEnum, SubtaskInt, TodoListItemInt } from "../../models/item";
import { newSubtask, deleteSubtask } from "../../api/mutate-todo-subtasks";

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

  // state
  const [newTask, setNewTask] = useState<string>("");
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

  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => deleteSubtask(taskId, token),
    onSuccess: (data) => {
      console.log("data: ", data);
    },
    onError: (error: AxiosError) => setFetchError(error),
  });

  // handler functions
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTask(e.currentTarget.value);
  };

  const handleDelete = () => {};

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    newMutation.mutate();
    setNewTask("");
  };

  return (
    <div>
      <h4>Subtasks</h4>
      <div>
        <form onSubmit={handleSave}>
          <Input
            label="Add subtask"
            type="text"
            name={EditItemFormInputsEnum.task}
            id={EditItemFormInputsEnum.task}
            value={newTask}
            handleChange={handleChange}
          />
          <Button type="submit" text="+" />
        </form>
      </div>
      <div>
        <ul>
          {taskList.map((task) => {
            return (
              <div key={task.taskId}>
                <li>{task.taskName}</li>
                <Button type="button" text="edit" handleClick={() => {}} />
                <Button
                  type="button"
                  text="x"
                  handleClick={() => deleteMutation.mutate(task.taskId)}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EditSubtasksModal;
