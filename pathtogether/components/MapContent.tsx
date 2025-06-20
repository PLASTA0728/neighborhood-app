import type { IUser } from "@/utils/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
import blueEssence from "@/utils/map-styles/blue-essence";
import avocadoWorld from "@/utils/map-styles/avocado-world";
import wy from "@/utils/map-styles/wy";

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
    <>
      {Array.isArray(users) && users.length > 0 && ((users).map((user, index) => (
        <MarkerWithInfoWindow
          key={user._id?.toString() ?? `user-${index}`}
          sessionNo={sessionNo.toString()}
          user={user}
          refreshUsers={refreshUsers}
        />
      ))
      )}
    </>
  );
}
