'use client'
import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import type { IUser } from '@/utils/types';
import { useUserActions } from '@/hooks/useUserActions'
import Panel from '@/components/Panel'
import { useUserFormData } from '@/hooks/useUserFormData'
import FormFields from '@/components/UserFormFields'
import useMediaQuery from '@/hooks/useMediaQuery'
import { APIProvider } from '@vis.gl/react-google-maps'
import ThemeToggle from '@/components/ThemeToggle'
import LoadingView from '@/components/LoadingView'

export default function EditUser() {
    const smBreakpoint = useMediaQuery('(min-width:520px)');
    const { sessionNo, userId } = useParams();
    const router = useRouter();
    const { updateUser, fetchUsers } = useUserActions();
    const [mapDoc, setMapDoc] = useState(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const [enabled, setEnabled] = useState(false);
    const [mapStyle, setMapStyle] = useState("default-light");
    
    const {
        loading,
        name, setName, 
        age, setAge,
        contact, setContact,
        role, setRole,
        location, setLocation,
        customResponses, setCustomResponses
    } = useUserFormData(sessionNo.toString(), userId.toString());
    
    const refreshUsers = useCallback(async () => {
        const data = await fetchUsers(sessionNo.toString());
        if (data) setUsers(data);
    }, [fetchUsers, sessionNo]);
    
    useEffect(() => {
        const fetchMap = async() => {
            try {
                const res = await fetch(`/api/map/get?sessionNo=${sessionNo}`);
                const data = await res.json();

                if (!data.success || !data.map) {
                    router.push('/not-found');
                } else {
                    setMapDoc(data.map);
                }
            } catch (error) {
                console.error("failed to fetch map data:", error);
                router.push('/not-found');
            }
        };
        if (sessionNo) {
            fetchMap();
            const loadUsers = async () => {
                const data = await fetchUsers(sessionNo.toString());
                if (data) setUsers(data);
            }
            loadUsers()
        }
    }, [sessionNo, router, fetchUsers]);

    const handleCustomChange = (fieldName: string, value: string) => {
        setCustomResponses(prev => {
            const existing = prev.find(r => r.fieldName === fieldName);
            if (existing) {
                return prev.map(r =>
                    r.fieldName === fieldName ? { ...r, response: value } : r
                );
            } else {
                return [...prev, { fieldName, response: value }];
            }
        });
    };

    if (loading) return (
        <LoadingView />
    )

    return (
        <APIProvider  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={['places']}>
    <main className="relative w-full">
        <div className="absolute top-5 right-5 z-20">
                <ThemeToggle mapStyle={mapStyle} setMapStyle={setMapStyle}/>
              </div>
        <div className={`flex ${ smBreakpoint? 'flex-row h-screen' : 'flex-col min-h-screen'}`}>
            <div className={`${ smBreakpoint? 'w-[400px] overflow-y-auto h-full' : 'w-full'} mb-6 pt-4 pl-4 pr-4 relative dark:bg-gray-800`}>
                <div className='text-2xl text-center'>
                you are now editing <span className='text-emerald-400'>{name}</span>&apos;s info on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}> 
                    session code: {mapDoc?.sessionNo}
                <br></br>
                    user id: {userId} 
                </div>

                <FormFields name={name}
                    setName={setName}
                    age={age}
                    setAge={setAge}
                    contact={contact}
                    setContact={setContact}
                    role={role}
                    setRole={setRole}
                    location={location}
                    setLocation={setLocation}
                    enabled={enabled}
                    setEnabled={setEnabled}
                    mapDoc={mapDoc}
                    customResponses={customResponses}
                    handleCustomChange={handleCustomChange}
                />

                <div className='flex flex-col items-center mb-4'>
                <Button
                    className="mt-4"
                    type="submit"
                    onClick={async () => {
                        try {
                            await updateUser(sessionNo.toString(), userId.toString(), {
                                name, 
                                age,
                                contact,
                                role, 
                                location,
                                customResponses, 
                            });
                            alert("user updated!");
                            const data = await fetchUsers(sessionNo.toString());
                            if (data) setUsers(data);
                        } catch (e) {
                            alert("something broke :( " + e.message);
                        }
                        router.push(`/${sessionNo}/edit`)
                    }}
                >
                    push my changes
                </Button>
                </div>
            </div>
            <Panel sessionNo={sessionNo.toString()} users={users} refreshUsers={refreshUsers} mapStyle={mapStyle} setMapStyle={setMapStyle}/>
        </div>
    </main>
    </APIProvider>
    )
}