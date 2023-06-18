import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ErrorContext from "../../../context/ErrorContext";
import { SubtaskInt } from "../../../models/todo";
import Checkbox from "../../forms/Checkbox";
import { checkSubtask } from "../../../api/mutate-todo-subtasks";

interface DisplaySubtaskProps {
  tasks: SubtaskInt[];
  listId: number;
  token: string;
}

const DisplayTodoSubtask = ({ tasks, listId, token }: DisplaySubtaskProps) => {
  const queryClient = useQueryClient();
  const { active, toggleError, provideData } = useContext(ErrorContext);
  const mutation = useMutation({
    mutationFn: ({ taskId, itemId }: { taskId: number; itemId: number }) =>
      checkSubtask(taskId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => {
      toggleError(true);
      provideData(error);
    },
  });

  return (
    <ul>
      {tasks
        .sort((a, b) => a.taskId - b.taskId)
        .map((task) => {
          return (
            <div
              key={task.taskId}
              className={`pl-10 pr-16 py-2 text-sm ${
                task.isChecked && "line-through text-gray-600 dark:text-gray-500"
              }`}>
              <li>
                <div className="flex flex-row items-center">
                  <Checkbox
                    id={`subtask-checkbox-${task.taskId}`}
                    disabled={active}
                    checked={task.isChecked}
                    onChange={() => mutation.mutate({ taskId: task.taskId, itemId: task.itemId })}
                  />
                  <span className="text-justify overflow-hidden ml-1">{task.taskName}</span>
                </div>
              </li>
            </div>
          );
        })}
    </ul>
  );
};

export default DisplayTodoSubtask;
