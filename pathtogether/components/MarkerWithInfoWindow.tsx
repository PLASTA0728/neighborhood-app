import type { IUser } from "@/utils/types";
import { AdvancedMarker, AdvancedMarkerAnchorPoint, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import Popup from "./Popup";
import React, {useState} from "react"; 

type Props = {
  sessionNo: string;
  user: IUser;
  refreshUsers: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default function MarkerWithInfoWindow({sessionNo, user, refreshUsers, ...props}: Props){
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const shouldShowInfoWindow = hovered || clicked;
  const [markerRef, marker] = useAdvancedMarkerRef();
  const position = {
    lng: user.location.coordinates[0],
    lat: user.location.coordinates[1],
  };


  return (
    <div {...props}>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked(true)}
        className="custom-marker"
        style={{
          transform: `scale(${hovered || clicked ? 1.2 : 1})`,
          transformOrigin: AdvancedMarkerAnchorPoint['BOTTOM'].join(''),
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <Pin
          background={clicked ? '#facc15' : hovered ? '#22ccff' : null}
          borderColor={clicked ? '#e1b712': hovered ? '#1e89a1' : null}
          glyphColor={clicked? '#c8a310': hovered ? '#0f677a' : null}
          />
      </AdvancedMarker>

      {shouldShowInfoWindow && (
          <Popup sessionNo={sessionNo} user={user} refreshUsers={refreshUsers} 
            anchor={marker}
            onCloseClick={() => {setClicked(false); setHovered(false);}}/>
      )}
    </div>
  )
  
}