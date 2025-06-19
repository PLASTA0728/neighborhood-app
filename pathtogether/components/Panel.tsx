'use client'
// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#9

import { Button } from '@/ui/button';
import type { IUser } from '@/utils/types';
import { useState } from 'react';
import MapView from './MapView';
import CardView from './CardView';

type Props = {
    sessionNo: string;
    users: IUser[];
    refreshUsers: () => void;
}

export default function Panel({ sessionNo, users, refreshUsers }: Props) {
    const [panelView, setPanelView] = useState("map");
    return (
        <div className='flex-1 bg-gray-100 relative min-h-screen'>
            <div className='absolute top-4 right-0 z-30 grid grid-cols-2 gap-4'>
                <select className='bg-white text-black h-10 items-center rounded-lg px-4 text-sm font-medium'
                    onChange={(e) => setPanelView(e.target.value)}>
                    <option value="map">map view</option>
                    <option value="card">card view</option>
                </select>
                <Button className='w-20' onClick={refreshUsers}>
                    refresh
                </Button>
            </div>
            <div className='w-full flex justify-center'>
            {panelView==="map" ? (
                <MapView sessionNo={sessionNo} users={users} refreshUsers={refreshUsers}/>
            ) : (
                <CardView sessionNo={sessionNo} users={users} refreshUsers={refreshUsers}/>
            )}
            </div>
        </div>
    );
}