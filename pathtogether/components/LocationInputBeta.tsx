import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect } from "react";

export default () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
  });

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => (placeDetails)
      );
  }, [placePredictions]);

  return (
    <>
      <input
        placeholder="Debounce 500 ms"
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
        }}
      />
      {placePredictions.map((item) => (item))}
    </>
  );
};