import usePlacesAutocomplete from "use-places-autocomplete";

import Input from "../../forms/Input";
import ChevonRight from "../../../icons/ChevonRight";

interface PlacesAutocompleteProps {
  loc: string | null;
  setLoc: (value: React.SetStateAction<string | null>) => void;
}

const PlacesAutocomplete = ({ loc, setLoc }: PlacesAutocompleteProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // const handleAdd = async () => {
  //   // TODO: form error component
  //   // if (!loc) return setFormError("Enter an address or place");
  //   // const results = await getGeocode({ address: loc });
  //   // const { lat, lng } = getLatLng(results[0]);
  //   // console.log("lat, lng: ", lat, lng);
  //   // setCoords({ lat, lng });
  //   clearSuggestions();
  // };

  // const handleDelete = () => {
  //   setLoc(null);
  //   setCoords(null);
  // };
  return (
    <>
      <Input
        label="Address"
        id=""
        name=""
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
                  className="flex flex-row items-center text-sm my-1.5 pl-2 hover:bg-azure hover:text-white">
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

export default PlacesAutocomplete;
