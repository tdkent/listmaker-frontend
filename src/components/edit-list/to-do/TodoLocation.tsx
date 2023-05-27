import usePlacesAutocomplete from "use-places-autocomplete";

import Input from "../../forms/Input";
import ChevonRight from "../../../icons/ChevonRight";
import { InputIdsEnum } from "../../../models/forms";

interface TodoLocationProps {
  isLoaded: boolean;
  loc: string | null;
  setLoc: (value: React.SetStateAction<string | null>) => void;
}

const TodoLocation = ({ isLoaded, loc, setLoc }: TodoLocationProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  return (
    <>
      <Input
        label="Address"
        id={InputIdsEnum.editTodoAddress}
        type="text"
        disabled={!ready}
        required={false}
        value={value || loc || ""}
        handleChange={(e: React.FormEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
          setLoc("");
        }}
      />
      {status === "OK" && data && (
        <div>
          <ul>
            {data.map((place) => {
              return (
                <li
                  key={place.place_id}
                  onClick={() => {
                    setValue("");
                    setLoc(place.description);
                    clearSuggestions();
                  }}
                  className="flex flex-row items-center text-sm my-1.5 pl-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">
                  <ChevonRight />
                  {place.description}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default TodoLocation;
