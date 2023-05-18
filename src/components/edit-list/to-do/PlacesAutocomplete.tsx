import { useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import Form from "../../forms/Form";
import Input from "../../forms/Input";
import Button from "../../forms/Button";
import ChevonRight from "../../../icons/ChevonRight";

interface PlacesAutocompleteProps {
  loc: string | null;
  setLoc: (value: React.SetStateAction<string | null>) => void;
}

const PlacesAutocomplete = ({ loc, setLoc }: PlacesAutocompleteProps) => {
  const [formError, setFormError] = useState<string>("");

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
      {/* <Form id="todo-location-form"> */}
      <Input
        label="Address"
        id=""
        name=""
        type="text"
        disabled={!ready}
        value={value || loc || ""}
        handleChange={(e: React.FormEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
          setFormError("");
          setLoc("");
        }}
      />
      {formError && (
        <div>
          <p>{formError}</p>
        </div>
      )}
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
      {/* <Button text="+" type="button" handleClick={handleAdd} />
        <Button text="x" type="button" handleClick={handleDelete} /> */}
      {/* </Form> */}
    </>
  );
};

export default PlacesAutocomplete;
