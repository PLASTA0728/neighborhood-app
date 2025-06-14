'use client'
// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#9

import { Button } from '@/ui/button';
import Card from './Card';
import type { IUser } from '@/utils/types';

type Props = {
    sessionNo: string;
    users: IUser[];
    refreshUsers: () => void;
}

export default function Panel({ sessionNo, users, refreshUsers }: Props) {
    return (
        <div className='flex-1 bg-gray-100 p-4 relative min-h-screen'>
            <Button className='absolute top-4 right-4 z-30' onClick={refreshUsers}>
                refresh
            </Button>
            <div className='w-full flex justify-center'>
                <div className='mt-16 flex flex-wrap gap-4 justify-start'>
                    {users.length > 0 ? (
                        users.map((user, i) => (
                            <Card key={i} sessionNo={sessionNo} user={user} refreshUsers={refreshUsers} />
                        ))
                    ) : (
                        <p className='text-sm text-gray-400 text-center'>
                            no users. <span className='inline italic'>yet?</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}