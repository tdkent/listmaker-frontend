import Select from "../forms/Select";
import Checkbox from "../forms/Checkbox";
import { unitOpt, UnitOptEnum } from "../../models/todo";

interface RepeatTodoProps {
  isRecurring: boolean;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  recur: string;
  setRecur: (value: React.SetStateAction<string>) => void;
}

const RepeatTodo = ({ isRecurring, setIsRecurring, recur, setRecur }: RepeatTodoProps) => {
  const handleChange = () => {
    setIsRecurring((prev) => !prev);
    if (isRecurring) setRecur("");
    else setRecur(UnitOptEnum.d);
  };
  return (
    <div>
      <h4>Repeat</h4>
      <Checkbox checked={isRecurring} onChange={handleChange} />
      <div hidden={!isRecurring}>
        <h4>Every</h4>
        <Select
          label=""
          name=""
          id="repeat-todo-unit"
          defaultValue={recur || unitOpt[0]}
          options={unitOpt}
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) => setRecur(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default RepeatTodo;
