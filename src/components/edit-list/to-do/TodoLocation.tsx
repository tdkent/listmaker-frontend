import { useMemo } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import TodoMap from "./TodoMap";

interface TodoLocationProps {
  isLoaded: boolean;
  loc: string | null;
  coords: google.maps.LatLngLiteral | null;
  setLoc: (value: React.SetStateAction<string | null>) => void;
  setCoords: (value: React.SetStateAction<google.maps.LatLngLiteral | null>) => void;
}

const TodoLocation = ({ isLoaded, loc, setLoc, coords, setCoords }: TodoLocationProps) => {
  const center = useMemo(() => coords, [coords]);
  return (
    <div>
      <div>
        <h4>Location</h4>
      </div>
      <PlacesAutocomplete setCoords={setCoords} loc={loc} setLoc={setLoc} />
      {center && <div>{isLoaded ? <TodoMap center={center} /> : "Loading map..."}</div>}
    </div>
  );
};

export default TodoLocation;
