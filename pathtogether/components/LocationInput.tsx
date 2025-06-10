import { usePlacesWidget } from "react-google-autocomplete";

const LocationInput = () => {
    console.log("MAP API KEY:", process.env.NEXT_PUBLIC_MAP_API_KEY);
    const { ref } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
        onPlaceSelected: (place) => {
            console.log("Selected place:", place)
        },
        options: {
            types: ["geocode"],
        },
    });

    return (
        <input ref={ref} className="px-4 py-4 rounded-md bg-white text-black" placeholder="search for a place" />
    );
};

export default LocationInput;