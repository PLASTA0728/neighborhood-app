import type { IUser } from "@/utils/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

export default function Markers({
  sessionNo,
  users,
  refreshUsers,
}: {
  sessionNo: string;
  users: IUser[];
  refreshUsers: () => void;
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
