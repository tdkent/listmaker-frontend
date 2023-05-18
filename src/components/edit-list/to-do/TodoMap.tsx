import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface TodoMapProps {
  center: { lat: number; lng: number };
}

const TodoMap = ({ center }: TodoMapProps) => {
  return (
    <div className="border border-gray-600 mx-auto mt-4 h-52 w-full">
      <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};

export default TodoMap;
