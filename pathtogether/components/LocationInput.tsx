// TODO: https://developers.google.com/maps/documentation/javascript/place-autocomplete-data use this to beautify
'use client';

import { useEffect, useRef } from 'react';
import type { ILocation } from '@/utils/types';

type Props = {
  onPlaceSelect?: (place: ILocation) => void;
  className?: string;
};

export default function LocationInput({
  onPlaceSelect, 
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (!window?.google || !window?.google.maps?.importLibrary) return;

  const loadAutocomplete = async () => {
    //@ts-expect-error placeAutocompleteElement does not exist on type
    const [{ PlaceAutocompleteElement }] = await Promise.all([
      google.maps.importLibrary('places'),
    ]);

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    const autocomplete = new PlaceAutocompleteElement();

    autocomplete.id = 'place-autocomplete-textarea';
    autocomplete.setAttribute('placeholder', 'Search for a place...');
    autocomplete.setAttribute('style', 'width: 100%; height: auto;');
    
    console.log('setting up autocomplete')

    autocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
      if (!placePrediction) return;
      const place = placePrediction.toPlace();
      await place.fetchFields({
        fields: ['id', 'displayName', 'formattedAddress', 'location'],
      });

      const placeData = place.toJSON();
      console.log("selected place: ", placeData);

      // if (onPlaceSelect) onPlaceSelect(placeData);
      if (onPlaceSelect && placeData?.location?.lat !== undefined && placeData?.location?.lng !== undefined) {
        const mappedLocation: ILocation = {
          type: "Point",
          id: placeData.id,
          coordinates: [placeData.location.lng, placeData.location.lat], // order which geoJSON uses
          displayName: placeData.displayName || placeData.formattedAddress || 'Unknown Location',
        };

        onPlaceSelect(mappedLocation);
        console.log("send to db:", mappedLocation);
      } 
    });
    containerRef.current?.appendChild(autocomplete);
  };
  loadAutocomplete();
}, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-md bg-white ${className}`}
    >
      <p className="mb-2 font-semibold text-gray-700">Search for a place:</p>
      {/* Autocomplete Web Component will be injected here */}
    </div>
  );
}
