'use client';
import { useRef, useEffect } from "react";
import monochrome from "@/utils/map-styles/monochrome.json";

export default function AnimatedMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const initialCenter = { lat: 37.7749, lng: -122.4194 };
    const map = new google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: 10,
      disableDefaultUI: true,
      gestureHandling: "none",
      keyboardShortcuts: false,
      draggable: false,
      scrollwheel: false,
      zoomControl: false,
      styles: monochrome,
    });

    let currentLng = initialCenter.lng;
    const animateMap = () => {
      currentLng += 0.001;
      map.setCenter({ lat: initialCenter.lat, lng: currentLng });
    };

    const interval = setInterval(animateMap, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={mapRef}
      className="absolute w-full h-full z-10 opacity-10"
      style={{ pointerEvents: "none" }}
    ></div>
  );
}
