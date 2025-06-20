"use client";

import React from 'react';
import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';
import type { IUser } from '@/utils/types';

type Props = {
  sessionNo: string;
  users: IUser[];
  refreshUsers: () => void;
  mapStyle: string;
}
import MapContent from './MapContent';


export default function MapView({sessionNo, users, refreshUsers, mapStyle}: Props) {
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  const mapId = process.env.NEXT_PUBLIC_MAPID as string;

  return (
    <APIProvider apiKey={API_KEY} libraries={['marker']}>
      <div className="h-screen w-full">
        <Map
          mapId={mapId}
          defaultZoom={3}
          defaultCenter={{ lat: 0, lng: 275 }}
          gestureHandling="greedy"
          disableDefaultUI
          colorScheme={mapStyle === 'dark' ? 'DARK' : 'LIGHT'}
        >
          {users.length > 0 &&
          <MapContent users={users} sessionNo={sessionNo} refreshUsers={refreshUsers} mapStyle={mapStyle} />
        }
        </Map>
      </div>
    </APIProvider>
  );
}
