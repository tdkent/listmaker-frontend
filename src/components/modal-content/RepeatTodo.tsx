import Select from "../forms/Select";
import Checkbox from "../forms/Checkbox";
import { recurIntegerOpt, recurIntervalOptS, recurIntervalOptP } from "../../models/todo";
import { InputIdsEnum } from "../../models/forms";

interface RepeatTodoProps {
  isRecurring: boolean;
  setIsRecurring: (value: React.SetStateAction<boolean>) => void;
  recurInteger: string;
  setRecurInteger: (value: React.SetStateAction<string>) => void;
  recurInterval: string;
  setRecurInterval: (value: React.SetStateAction<string>) => void;
}

const RepeatTodo = ({
  isRecurring,
  setIsRecurring,
  recurInteger,
  setRecurInteger,
  recurInterval,
  setRecurInterval,
}: RepeatTodoProps) => {
  const handleChange = () => setIsRecurring((prev) => !prev);
  return (
    <div className="my-2">
      <div className="flex items-center">
        <Checkbox id={InputIdsEnum.todoRepeat} checked={isRecurring} onChange={handleChange} />
        <label htmlFor={InputIdsEnum.todoRepeat}>Repeat {isRecurring && "item every:"}</label>
      </div>
      <div hidden={!isRecurring} className="mt-4">
        <Select
          label=""
          id={InputIdsEnum.todoRepeatInteger}
          defaultValue={recurInteger || "1"}
          options={recurIntegerOpt(10)}
          required={false}
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) =>
            setRecurInteger(e.currentTarget.value)
          }
        />
        <Select
          label=""
          id={InputIdsEnum.todoRepeatInterval}
          defaultValue={recurInterval || recurIntervalOptS[0]}
          required={false}
          options={Object.values(
            recurInteger === "1" || !recurInteger ? recurIntervalOptS : recurIntervalOptP
          )}
          handleSelect={(e: React.FormEvent<HTMLSelectElement>) =>
            setRecurInterval(e.currentTarget.value)
          }
        />
      </div>
    </div>
  );
};

export default RepeatTodo;
