'use client';

import { useEffect, useRef } from 'react';

type Props = {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
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

    autocomplete.addEventListener('gmp-select', async (event: CustomEvent) => {
      const placePrediction = event.detail.placePrediction;
      if (!placePrediction) return;
      
      const place = placePrediction.toPlace();
      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location'],
      });

      const placeData = place.toJSON();
      console.log("selected place: ", placeData);

      if (onPlaceSelect) onPlaceSelect(placeData);
    });
    // autocomplete.addEventListener('gmp-placechange', async () => {
    //   const place = await autocomplete.getPlace?.();
    //   if (place && onPlaceSelect) {
    //     onPlaceSelect(place);
    //   }
    // });
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
