import { useMemo } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import TodoMap from "./TodoMap";

interface TodoLocationProps {
  isLoaded: boolean;
  loc: string | null;
  setLoc: (value: React.SetStateAction<string | null>) => void;
}

const TodoLocation = ({ isLoaded, loc, setLoc }: TodoLocationProps) => {
  return (
    <div>
      <PlacesAutocomplete loc={loc} setLoc={setLoc} />
    </div>
  );
};

export default TodoLocation;
