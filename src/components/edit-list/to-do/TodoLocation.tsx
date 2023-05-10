import { useState, useMemo } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import TodoMap from "./TodoMap";

interface TodoLocationProps {
  isLoaded: boolean;
}

const TodoLocation = ({ isLoaded }: TodoLocationProps) => {
  const [coords, setCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const center = useMemo(() => coords, [coords]);
  return (
    <div>
      <div>
        <h4>Location</h4>
      </div>
      <PlacesAutocomplete setCoords={setCoords} />
      {center && <div>{isLoaded ? <TodoMap center={center} /> : "Loading map..."}</div>}
    </div>
  );
};

export default TodoLocation;
