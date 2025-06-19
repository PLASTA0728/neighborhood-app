"use client";

import React from 'react';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import {
  APIProvider,
  Map,
} from '@vis.gl/react-google-maps';
import type { IUser } from '@/utils/types';
type Props = {
  sessionNo: string;
  users: IUser[];
  refreshUsers: () => void;
}

export default function MapView({sessionNo, users, refreshUsers}: Props) {
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  return (
    <APIProvider apiKey={API_KEY} libraries={['marker']}>
      <div className="h-screen w-full">
        <Map
          mapId="1904e7ca5695eca971549ab9"
          defaultZoom={3}
          defaultCenter={{ lat: 12, lng: 0 }}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {users.length > 0 && (
            users.map((user, i) => {
              console.log("Rendering marker for user:", user);
              return (
                <MarkerWithInfoWindow key={i} sessionNo={sessionNo.toString()} user={user} refreshUsers={refreshUsers} />
              )})
            )}
        </Map>
      </div>
    </APIProvider>
  );
}
