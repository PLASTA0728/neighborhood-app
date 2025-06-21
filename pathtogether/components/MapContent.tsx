import type { IUser } from "@/utils/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import blueEssence from "@/utils/map-styles/blue-essence";
import avocadoWorld from "@/utils/map-styles/avocado-world";
import wy from "@/utils/map-styles/wy";
import Markers from "./Markers";
import { Map } from "@vis.gl/react-google-maps";
import { STYLE_MAP } from "@/utils/mapStyles";

export default function MapContent({
  sessionNo,
  users,
  refreshUsers,
  mapStyle,
}: {
  sessionNo: string;
  users: IUser[];
  refreshUsers: () => void;
  mapStyle: string;
}) {
  const mapId = process.env.NEXT_PUBLIC_MAPID as string;
  const map = useMap();

  useEffect(() => {
    if (!map || users.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    users.forEach(user => {
      const [lng, lat] = user.location.coordinates;
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    }
    );
    // change map size
    map.fitBounds(bounds, 75);
    }, [map, users]);

  useEffect(() => {
    if (!map) return;

    const styleToApply = STYLE_MAP[mapStyle] ?? null;

    // If the style is `null`, reset to default
    if (!styleToApply) {
      map.setOptions({ styles: null });
      map.setMapTypeId('roadmap');
      return;
    }

    const styledMapType = new google.maps.StyledMapType(styleToApply);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
  }, [mapStyle, map]);

  return (
    <Map
      mapId={mapId}
      defaultZoom={3}
      defaultCenter={{ lat: 20, lng: 275 }}
      gestureHandling="greedy"
      disableDefaultUI
      colorScheme={mapStyle === 'dark' ? 'DARK' : 'LIGHT'}
    >
    {users.length > 0 && 
      <Markers users={users} sessionNo={sessionNo} refreshUsers={refreshUsers} />
    }
    </Map>
  );
}
