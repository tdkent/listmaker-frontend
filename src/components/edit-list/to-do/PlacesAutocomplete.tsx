import { useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import Form from "../../forms/Form";
import Input from "../../forms/Input";
import Button from "../../forms/Button";

interface PlacesAutocompleteProps {
  setCoords: (value: React.SetStateAction<google.maps.LatLngLiteral | null>) => void;
}

const PlacesAutocomplete = ({ setCoords }: PlacesAutocompleteProps) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [formError, setFormError] = useState<string>("");

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleClick = async () => {
    // TODO: form error component
    if (!selectedPlace) return setFormError("Enter an address or place");
    const results = await getGeocode({ address: selectedPlace });
    const { lat, lng } = getLatLng(results[0]);
    setCoords({ lat, lng });
    clearSuggestions();
    setSelectedPlace("");
  };
  return (
    <div>
      <Form id="todo-location-form">
        <Input
          label="Enter address"
          id=""
          name=""
          type="text"
          disabled={!ready}
          value={value || selectedPlace}
          handleChange={(e: React.FormEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
            setSelectedPlace("");
            setFormError("");
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
                      setSelectedPlace(place.description);
                    }}>
                    {place.description}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <Button text="+" type="button" handleClick={handleClick} />
      </Form>
    </div>
  );
};

export default PlacesAutocomplete;
