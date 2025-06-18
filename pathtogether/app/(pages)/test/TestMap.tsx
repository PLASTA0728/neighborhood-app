"use client"
import React, {useCallback, useState, useEffect} from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerProps,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  CollisionBehavior
} from '@vis.gl/react-google-maps';
import { useParams } from 'next/navigation';
import ControlPanel from './control-panel';
import './style.css';
import Card from '@/components/Card';

export type AnchorPointName = keyof typeof AdvancedMarkerAnchorPoint;

// A common pattern for applying z-indexes is to sort the markers
// by latitude and apply a default z-index according to the index position
// This usually is the most pleasing visually. Markers that are more "south"
// thus appear in front.

// const API_KEY =
//   globalThis.NEXT_PUBLIC_MAP_API_KEY ?? (process.env.NEXT_PUBLIC_MAP_API_KEY as string);
export default function Test(){
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);

const { sessionNo } = useParams();

const fetchMarkers = async (sessionNo: string) => {
  const res = await fetch(`/api/user/get?sessionNo=${sessionNo}`);
  const data = await res.json();
  setMarkers(
    data
    .filter(user => user.location?.coordinates?.length === 2) // ✅ ignore users without proper location
    .map((user, i) => ({
      id: user._id,
      zIndex: i,
      position: {
        lng: user.location.coordinates[0],
        lat: user.location.coordinates[1],
      },
      type: 'pin',
      user,
    }))
  );
};

useEffect(() => {
  fetchMarkers(sessionNo.toString());
}, []);

const refreshUsers = useCallback(() => {
  fetchMarkers(sessionNo.toString());
}, [sessionNo]);

const Z_INDEX_SELECTED = markers.length;
const Z_INDEX_HOVER = markers.length + 1;

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [anchorPoint, setAnchorPoint] = useState('BOTTOM' as AnchorPointName);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);
  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedId(id);

      if (marker) {
        setSelectedMarker(marker);
      }

      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown(isShown => !isShown);
      }
    },
    [selectedId]
  );

  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY} libraries={['marker']}>
      <Map
        mapId={'1904e7ca5695eca971549ab9'}
        defaultZoom={5}
        defaultCenter={{ lat: 30.8715, lng: 120.4302 }} // near Nanxun  
        gestureHandling={'greedy'}
        onClick={onMapClick}
        clickableIcons={false}
        disableDefaultUI>
        {markers.map(({id, zIndex: zIndexDefault, position, type}) => {
          let zIndex = zIndexDefault;

          if (hoverId === id) {
            zIndex = Z_INDEX_HOVER;
          }

          if (selectedId === id) {
            zIndex = Z_INDEX_SELECTED;
          }

          if (type === 'pin') {
            return (
              <AdvancedMarkerWithRef
                onMarkerClick={(
                  marker: google.maps.marker.AdvancedMarkerElement
                ) => onMarkerClick(id, marker)}
                onMouseEnter={() => onMouseEnter(id)}
                onMouseLeave={onMouseLeave}
                key={id}
                zIndex={zIndex}
                className="custom-marker"
                style={{
                  transform: `scale(${[hoverId, selectedId].includes(id) ? 1.3 : 1})`,
                  transformOrigin: AdvancedMarkerAnchorPoint['BOTTOM'].join(' ')
                }}
                position={position}>
                <Pin
                  background={selectedId === id ? '#22ccff' : null}
                  borderColor={selectedId === id ? '#1e89a1' : null}
                  glyphColor={selectedId === id ? '#0f677a' : null}
                />
              </AdvancedMarkerWithRef>
            );
          }

          if (type === 'html') {
            return (
              <React.Fragment key={id}>
                <AdvancedMarkerWithRef
                  position={position}
                  zIndex={zIndex}
                  anchorPoint={AdvancedMarkerAnchorPoint[anchorPoint]}
                  className="custom-marker"
                  style={{
                    transform: `scale(${[hoverId, selectedId].includes(id) ? 1.3 : 1})`,
                    transformOrigin:
                      AdvancedMarkerAnchorPoint[anchorPoint].join(' ')
                  }}
                  onMarkerClick={(
                    marker: google.maps.marker.AdvancedMarkerElement
                  ) => onMarkerClick(id, marker)}
                  onMouseEnter={() => onMouseEnter(id)}
                  collisionBehavior={
                    CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY
                  }
                  onMouseLeave={onMouseLeave}>
                  <div
                    className={`custom-html-content ${selectedId === id ? 'selected' : ''}`}></div>
                </AdvancedMarkerWithRef>

                {/* anchor point visualization marker */}
                <AdvancedMarkerWithRef
                  onMarkerClick={(
                    marker: google.maps.marker.AdvancedMarkerElement
                  ) => onMarkerClick(id, marker)}
                  zIndex={zIndex + 1}
                  onMouseEnter={() => onMouseEnter(id)}
                  onMouseLeave={onMouseLeave}
                  anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
                  position={position}>
                  <div className="visualization-marker"></div>
                </AdvancedMarkerWithRef>
              </React.Fragment>
            );
          }
        })}

        {infoWindowShown && selectedMarker && (
          <InfoWindow
            anchor={selectedMarker}
            pixelOffset={[0, -2]}
            onCloseClick={handleInfowindowCloseClick}>
            <Card sessionNo={sessionNo.toString()} user={markers.find(m => m.id === selectedId)?.user} refreshUsers={refreshUsers}/>
          </InfoWindow>
        )}
      </Map>
      <ControlPanel
        anchorPointName={anchorPoint}
        onAnchorPointChange={(newAnchorPoint: AnchorPointName) =>
          setAnchorPoint(newAnchorPoint)
        }
      />
    </APIProvider>
  );
};

export const AdvancedMarkerWithRef = (
  props: AdvancedMarkerProps & {
    onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
  }
) => {
  const {children, onMarkerClick, ...advancedMarkerProps} = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}>
      {children}
    </AdvancedMarker>
  );
};
