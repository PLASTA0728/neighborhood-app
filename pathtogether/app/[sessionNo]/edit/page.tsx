'use client'
// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import FormInput from '@/components/FormInput'
import { saveUser } from '@/utils/saveUser'
import CustomFieldList from '@/components/CustomFieldList'
import type { IUser } from '@/lib/models/Session'

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
    console.log(mapDoc);

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const res = await fetch(`/api/user/get?sessionNo=${sessionNo}`);
                if (!res.ok) {
                    const text = await res.text(); // read raw response
                    console.error("API returned error:", res.status, text);
                    return;
                }
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("failed to fetch users", err);
            }
        };
        
        fetchUsers();
    }, [sessionNo]);
    
    console.log(users);

    if (loading) return <p>Loading map...</p>;

    return (
    <main className="relative w-full h-screen">
        <div className='flex flex-col sm:flex-row h-screen w-full'>
            <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 flex flex-col relative">
                <div className='text-2xl text-center'>
                take me on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map for <span className='text-emerald-400'>{mapDoc?.groupName}</span>!
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}>
                session code: {mapDoc?.sessionNo}
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4">
                <FormInput placeholder='my name' value={name} onChange={setName}/>
                <FormInput placeholder='my age' value={age} onChange={setAge}/>
                <FormInput placeholder='my contact' value={contact} onChange={setContact}/>
                <FormInput placeholder='my role' value={role} onChange={setRole}/>
                </div>

                <div className='flex flex-col'>
                <input className='px-4 py-4 rounded-md bg-white text-black' placeholder='my location' />
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
                    onClick={() =>
                        saveUser(sessionNo.toString(), { name, age, contact, role, customResponses })
                        .then(() => alert("user saved!"))
                        .catch((e) => alert("something broke: " + e.message))
                    }
                    >
                    ping myself on the map!
                </Button>
                </div>
            </div>

            <div className="flex-1 bg-gray-200 flex items-center justify-center">
                <div className='grid grid-col gap-4'>
                    {users.map((user, i) => (
                        <div key={i} className='border rounded-xl p-4 shadow'>
                            <h2 className='font-bold text-lg text-black'>{user.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main>
    )
}