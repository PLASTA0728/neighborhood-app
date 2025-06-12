'use client';

import { useEffect, useRef } from 'react';

type Props = {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  className?: string;
  containerClassName?: string;
};

export default function PlaceTextArea({
  onPlaceSelect,
  className = '',
  containerClassName = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (!window?.google || !window?.google.maps?.importLibrary) return;

  const loadAutocomplete = async () => {
    //@ts-ignore
    const [{ PlaceAutocompleteElement }] = await Promise.all([
      google.maps.importLibrary('places'),
    ]);

    // 🧼 Clear existing autocomplete elements first
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // ← This is key
    }

    //@ts-ignore
    const autocomplete = new PlaceAutocompleteElement();

    autocomplete.id = 'place-autocomplete-textarea';
    autocomplete.setAttribute('placeholder', 'Search for a place...');
    autocomplete.setAttribute('style', 'width: 100%; height: auto;');

    containerRef.current?.appendChild(autocomplete);
  };

  loadAutocomplete();
}, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-lg border p-4 shadow-md bg-white ${containerClassName}`}
    >
      <p className="mb-2 font-semibold text-gray-700">Search for a place:</p>
      {/* Autocomplete Web Component will be injected here */}
    </div>
  );
}
