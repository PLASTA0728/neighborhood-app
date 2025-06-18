"use client";

import React, { useCallback, useState, useEffect } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin
} from '@vis.gl/react-google-maps';
import type { IUser } from '@/utils/types';
import MarkerWithInfowindow from '@/components/MarkerWithInfowindow';
import { useParams } from 'next/navigation';
import { useUserActions } from '@/hooks/useUserActions';

export default function MapPage() {
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY as string;
  const [users, setUsers] = useState<IUser[]>([]);
  const { fetchUsers } = useUserActions();
  const { sessionNo } = useParams();
  const refreshUsers = useCallback(async () => {
    console.log(sessionNo);
    const data = await fetchUsers(sessionNo.toString());
    console.log('Fetched users:', data); // ✅ LOG HERE
    if (data) setUsers(data);
  }, [fetchUsers, sessionNo]);
  
  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);


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
              console.log("Rendering marker for user:", user); // ✅ LOG HERE
              return (
                <MarkerWithInfowindow key={i} sessionNo={sessionNo.toString()} user={user} refreshUsers={refreshUsers} />
              )})
            )}
          {/* Marker with stateful InfoWindow */}
        </Map>
      </div>
    </APIProvider>
  );
}
