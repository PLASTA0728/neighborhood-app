'use client'
import { Switch } from '@headlessui/react'
import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import FormInput from '@/components/FormInput'
import CustomFieldList from '@/components/CustomFieldList'
import type { IUser, ILocation, ICustomResponse } from '@/utils/types';
import { useUserActions } from '@/hooks/useUserActions'
import Panel from '@/components/Panel'
import LocationInput from '@/components/LocationInput'
import { SquareLoader } from 'react-spinners'
import { useUserFormData } from '@/hooks/useUserFormData'


export default function EditUserPage() {
    const { sessionNo, userId } = useParams();
    const router = useRouter();
    const { updateUser, fetchUsers } = useUserActions();
    const [mapDoc, setMapDoc] = useState(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const [enabled, setEnabled] = useState(false);
    
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
        <div>
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <SquareLoader color="#94a3b8"/>
              <p className='text-sm'>loading...</p>
            </div>
        </div>
    )

    return (
    <main className="relative w-full">
        <div className='flex flex-col sm:flex-row min-h-screen w-full'>
            <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 relative">
                <div className='text-2xl text-center'>
                you are now editing <span className='text-emerald-400'>{name}</span>&apos;s info on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}> 
                    session code: {mapDoc?.sessionNo}
                <br></br>
                    user id: {userId} 
                </div>

                <div className="flex flex-col xs:grid xs:grid-cols-2 sm:max-smm:flex sm:max-smm:flex-col gap-4 pb-4">
                <FormInput placeholder='my name' value={name} onChange={setName}/>
                <FormInput placeholder='my age' value={age} onChange={setAge}/>
                <FormInput placeholder='my contact' value={contact} onChange={setContact}/>
                <FormInput placeholder='my role' value={role} onChange={setRole}/>
                </div>

                <div className='flex flex-col'>
                <LocationInput onPlaceSelect={(location) => setLocation(location)} />
                </div>

                <div id="blurred-location" className='mt-4 flex justify-between'>
                <div>blurred location</div>
                <div id='switch'>
                    <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-600 data-focus:outline data-focus:outline-white"
                    >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                    />
                    </Switch>
                </div>
                </div>

                <div className='text-gray-400 text-sm mt-2'>
                if you rather prefer share a relatively blurred location, we will handle this for you! this will neither be stored in our dataset.
                </div>
                {mapDoc?.customFields?.length > 0 && (
                <>
                <div className='text-xl mt-4 mb-2'>custom fields</div>
                <CustomFieldList fields={mapDoc?.customFields || []} responses={customResponses} onChange={handleCustomChange} />
                </>
                )}

                <div className='flex flex-col items-center'>
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
                    }}
                >
                    push my changes
                </Button>
                </div>
            </div>
            <Panel sessionNo={sessionNo.toString()} users={users} refreshUsers={refreshUsers}/>
            
        </div>
    </main>
    )
}