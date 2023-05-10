import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface TodoMapProps {
  center: { lat: number; lng: number };
}

const TodoMap = ({ center }: TodoMapProps) => {
  return (
    <div>
      <GoogleMap zoom={16} center={center} mapContainerClassName="map-container">
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default TodoMap;
