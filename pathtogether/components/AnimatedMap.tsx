'use client';
import { useEffect, useState } from "react";
import monochrome from "@/utils/map-styles/monochrome.json";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

const AnimatedMapInner = () => {
  const map = useMap();
  const [lng, setLng] = useState(-122.4194);
  const lat = 37.7749;

  useEffect(() => {
    if (!map) return;

    const styledMapType = new google.maps.StyledMapType(monochrome);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    const interval = setInterval(() => {
      const newLng = lng + 0.001;
      map.setCenter({lat, lng: newLng});
      setLng(newLng);
    }, 30);

    return () => clearInterval(interval);
  }, [map, lng]);

  return null;
};

export default function AnimatedMap() {
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY as string;

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="absolute w-full h-full z-10 opacity-10 pointer-events-none">
        <Map
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
          defaultZoom={10}
          disableDefaultUI
          gestureHandling="none"
          draggable={false}
          keyboardShortcuts={false}
          scrollwheel={false}
          zoomControl={false}
        >
          <AnimatedMapInner />
        </Map>
      </div>
    </APIProvider>
  )
}