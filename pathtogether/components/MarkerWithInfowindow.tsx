import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import React, {useState} from "react";
import type { IUser } from "@/utils/types";
import Card from "./Card";

type Props = {
    sessionNo: string;
    user: IUser;
    refreshUsers: () => void;
};

export default function MarkerWithInfowindow({sessionNo, user, refreshUsers}: Props){
    const [infowindowShown, setInfowindowShown] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const position = {
        lng: user.location.coordinates[0],
        lat: user.location.coordinates[1],
    };

    return (
        <>
            <AdvancedMarker 
                ref={markerRef}
                onClick={() => setInfowindowShown(true)}
                position={position}    
            />
            {infowindowShown && (
                <InfoWindow 
                    pixelOffset={[0, -2]}
                    anchor={marker}
                    onCloseClick={() => setInfowindowShown(false)}>
                    <Card sessionNo={sessionNo} user={user} refreshUsers={refreshUsers} />
                </InfoWindow>
            )
            }
        </>
    )
}