import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useMapsLibrary, APIProvider } from '@vis.gl/react-google-maps';
import { useAutocompleteSuggestions } from '@/hooks/useAutocompleteSuggestions';
import { ILocation } from '@/utils/types';

interface Props {
  onPlaceSelect: (place: ILocation) => void;
  className?: string;
  initialValue?: string;
}

export const AutocompleteCustom = ({ onPlaceSelect, className = '', initialValue }: Props) => {
  const places = useMapsLibrary('places');

  const [inputValue, setInputValue] = useState(initialValue || '');

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
      setHasSelected(true);
    }
  }, [initialValue]);

  const [hasSelected, setHasSelected] = useState(false); 
  const { suggestions, resetSession } = useAutocompleteSuggestions(
    hasSelected ? '' : inputValue // dont query the ones thats already made
  );

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setInputValue(newValue);
    setHasSelected(false); //when user is typing again, reactivate autocomplete
  }, []);

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places || !suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['location', 'displayName', 'formattedAddress', 'id'],
      });

      const placeData = place.toJSON() as {
        id?: string;
        displayName?: string;
        formattedAddress?: string;
        location?: { lat: number; lng: number };
      };

      if (
        onPlaceSelect &&
        placeData?.location?.lat !== undefined &&
        placeData?.location?.lng !== undefined
      ) {
        const mappedLocation: ILocation = {
          type: 'Point',
          id: placeData.id,
          coordinates: [placeData.location.lng, placeData.location.lat],
          displayName:
            placeData.displayName || placeData.formattedAddress || 'Unknown Location',
        };
        console.log(mappedLocation);
        onPlaceSelect(mappedLocation); // ✅ Send to DB or parent logic
      }

      // ✅ Update input + freeze autocomplete
      setInputValue(
          suggestion.placePrediction?.text.toString() ||
          placeData.displayName ||
          placeData.formattedAddress ||
          ''
      );
      setHasSelected(true); // ❌ don't re-query suggestions after selection
      resetSession(); // reset token
    },
    [places, onPlaceSelect]
  );

  if (!places) return null;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={['places']}>
      <div className={`autocomplete-container`}>
        <input
          value={inputValue}
          onInput={handleInput}
          placeholder="Search for a place ..."
          onChange={(e) => {setInputValue(e.target.value); setHasSelected(false)}}
          className={`w-full px-4 py-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white  ${className}`}
        />

        {!hasSelected && suggestions.length > 0 && (
          <ul className="custom-list mt-2 border border-gray-200 dark:border-gray-700 rounded-md shadow bg-white dark:bg-gray-900 z-50 absolute w-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placePrediction?.text.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </APIProvider>
  );
};
