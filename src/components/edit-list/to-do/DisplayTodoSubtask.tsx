import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useError from "../../../hooks/useError";
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
  const { setFetchError } = useError();

  const mutation = useMutation({
    mutationFn: ({ taskId, itemId }: { taskId: number; itemId: number }) =>
      checkSubtask(taskId, itemId, token),
    onSuccess: () => queryClient.invalidateQueries(["list", listId]),
    onError: (error: AxiosError) => setFetchError(error),
  });

  return (
    <ul>
      {tasks
        .sort((a, b) => a.taskId - b.taskId)
        .map((task) => {
          return (
            <div
              key={task.taskId}
              className={`text-[13px] px-4 py-2 ${task.isChecked && "line-through text-gray-600"}`}>
              <li>
                <Checkbox
                  checked={task.isChecked}
                  onChange={() => mutation.mutate({ taskId: task.taskId, itemId: task.itemId })}
                />
                {task.taskName}
              </li>
            </div>
          );
        })}
    </ul>
  );
};

export default DisplayTodoSubtask;
