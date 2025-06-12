'use client'
// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import FormInput from '@/components/FormInput'
import { saveUser } from '@/utils/saveUser'
import CustomFieldList from '@/components/CustomFieldList'
import type { IUser } from '@/lib/models/Session'
import { useUserActions } from '@/hooks/useUserActions'
import Panel from '@/components/Panel'
import LocationInput from '@/components/LocationInput'
import LocationInputBeta from '@/components/LocationInputBeta'
import AutocompleteMapField from '@/components/AutocompleteMapField'
import PlaceSearchInput from '@/components/LocationInputGamma'
import PlaceTextArea from '@/components/LocationInputGamma'


export default function EditSession() {
    const { sessionNo } = useParams();
    const router = useRouter();
    const [mapDoc, setMapDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enabled, setEnabled] = useState(false);

    // for the change value of the custom fields
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");
    
    type CustomResponse = {
        fieldName: string;
        response: string;
    }
    // for auto generate custom fields 
    const [customResponses, setCustomResponses] = useState<CustomResponse[]>([]);
    // for the user cards
    const [users, setUsers] = useState<IUser[]>([]);

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

    useEffect(() => {
        const fetchMap = async() => {
            setLoading(true);
            const res = await fetch(`/api/map/get?sessionNo=${sessionNo}`);
            const data = await res.json();

            if (!data.success || !data.map) {
                router.push('/not-found');
            } else {
                setMapDoc(data.map);
                setLoading(false);
            }
        };

        if (sessionNo) fetchMap();
    }, [sessionNo, router])
    // console.log(mapDoc);
    
    const { fetchUsers } = useUserActions();
    
    const refreshUsers = useCallback(async () => {
        const data = await fetchUsers(sessionNo.toString());
        if (data) setUsers(data);
    }, [fetchUsers, sessionNo]);
    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers(sessionNo.toString());
            if (data) setUsers(data);
        }
        loadUsers();
    }, [fetchUsers, sessionNo]);



    if (loading) return <p>Loading map...</p>;

    return (
    <main className="relative w-full">
        <div className='flex flex-col sm:flex-row min-h-screen w-full'>
            <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 relative">
                <div className='text-2xl text-center'>
                take me on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map for <span className='text-emerald-400'>{mapDoc?.groupName}</span>!
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}>
                session code: {mapDoc?.sessionNo}
                </div>

                <div className="flex flex-col xs:grid xs:grid-cols-2 sm:max-smm:flex sm:max-smm:flex-col gap-4 pb-4">
                <FormInput placeholder='my name' value={name} onChange={setName}/>
                <FormInput placeholder='my age' value={age} onChange={setAge}/>
                <FormInput placeholder='my contact' value={contact} onChange={setContact}/>
                <FormInput placeholder='my role' value={role} onChange={setRole}/>
                </div>

                <div className='flex flex-col'>
                <LocationInput />
                <LocationInputBeta />
                <AutocompleteMapField />
                <PlaceTextArea />
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
                            await saveUser(sessionNo.toString(), {
                                name, 
                                age,
                                contact,
                                role, 
                                customResponses
                            });
                            alert("user saved!");
                            await new Promise(r => setTimeout(r, 300));
                            const data = await fetchUsers(sessionNo.toString());
                            if (data) setUsers(data);
                        } catch (e) {
                            alert("something broke: " + e.message + " :( ");
                        }
                    }}
                >
                    pin myself on the map!
                </Button>
                </div>
            </div>
            <Panel sessionNo={sessionNo.toString()} users={users} refreshUsers={refreshUsers}/>
        </div>
    </main>
    )
}