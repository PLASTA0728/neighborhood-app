'use client'
// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#9

import { Button } from '@/ui/button';
import Card from './Card';
import type { IUser } from '@/utils/types';
import UserMap from './UserMap';

type Props = {
    sessionNo: string;
    users: IUser[];
    refreshUsers: () => void;
}

export default function Panel({ sessionNo, users, refreshUsers }: Props) {
    return (
        <div className='flex-1 bg-gray-100 relative min-h-screen'>
            <Button className='absolute top-4 right-4 z-30' onClick={refreshUsers}>
                refresh
            </Button>
            <div className='w-full flex justify-center'>
                <UserMap sessionNo={sessionNo} users={users} refreshUsers={refreshUsers}/>
            </div>
        </div>
    );
}