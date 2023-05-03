import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import AuthContext from "../../../context/AuthContext";
import useError from "../../../hooks/useError";
import Input from "../../forms/Input";
import Button from "../../forms/Button";
import Checkbox from "../../forms/Checkbox";
import { EditItemFormInputsEnum, SubtaskInt } from "../../../models/item";
import { newTodoSubtask } from "../../../api/mutate-todo-subtasks";

interface SubtasksProps {
  listId: number;
  itemId: number;
  tasks: SubtaskInt[];
}

const Subtasks = ({ listId, itemId, tasks }: SubtasksProps) => {
  const [task, setTask] = useState<string>("");

  const auth = useContext(AuthContext);
  const { setFetchError } = useError();

  const mutation = useMutation({
    mutationFn: () => newTodoSubtask(itemId, listId, task, auth.token as string),
    onSuccess: () => console.log("Success!"),
    onError: (error: AxiosError) => setFetchError(error),
  });

  const handleNew = (e: React.FormEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };
  const handleSave = () => {
    mutation.mutate();
    setTask("");
  };
  return (
    <div>
      <h4>Subtasks</h4>
      <div>
        <Input
          label="Add subtask"
          type="text"
          name={EditItemFormInputsEnum.task}
          id={EditItemFormInputsEnum.task}
          value={task}
          handleChange={handleNew}
        />
        <Button type="button" text="+" handleClick={handleSave} />
      </div>
      <div>
        <ul>
          {tasks.map((task) => {
            return (
              <div key={task.taskId}>
                <li>
                  <Checkbox checked={task.isChecked} onChange={() => {}} />
                  {task.taskName}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Subtasks;
