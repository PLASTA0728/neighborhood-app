import type { IUser } from "@/utils/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import blueEssence from "@/utils/map-styles/blue-essence";
import avocadoWorld from "@/utils/map-styles/avocado-world";
import wy from "@/utils/map-styles/wy";
import Markers from "./Markers";
import { Map } from "@vis.gl/react-google-maps";

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
    // change map style
    const mapStyleDict: Record<string, google.maps.MapTypeStyle[]> = {
      light: null,
      dark: null,
      'blue-essence': blueEssence,
      'avocado-world': avocadoWorld,
      wy: wy,
    };

    const styleToApply = mapStyleDict[mapStyle];
    if (!styleToApply) return;

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
