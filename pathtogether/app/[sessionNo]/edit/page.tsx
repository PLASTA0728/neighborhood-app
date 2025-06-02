'use client'
// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'

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

    const [customResponses, setCustomResponses] = useState<CustomResponse[]>([]);

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

    if (loading) return <p>Loading map...</p>;
    
    type Payload = {
        name: string;
        age: string;
        contact: string;
        role: string;
        customResponses: CustomResponse[];
    };


        //     const res = await fetch(endpoint, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(fullPayload),
    //     });

    async function saveUser(payload: Payload) {
        const fullPayload = {
            ...payload,
            sessionNo: sessionNo, 
        }
        console.log(payload);
        await fetch("/api/user/create", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fullPayload),
        });
    }

    return (
    <main className="w-full h-screen flex">
        <div className="w-2/5 pt-4 pl-4 pr-4">
            <div className='text-2xl text-center'>
            take me on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map for <span className='text-emerald-400'>{mapDoc?.groupName}</span>!
            </div>
            <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}>
            session code: {mapDoc?.sessionNo}
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4">
            <input className="px-4 py-4 rounded-md bg-white text-black" placeholder="my name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="px-4 py-4 rounded-md bg-white text-black" placeholder="my age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input className="px-4 py-4 rounded-md bg-white text-black" placeholder="my contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            <input className="px-4 py-4 rounded-md bg-white text-black" placeholder="my role" value={role} onChange={(e) => setRole(e.target.value)} />
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

            <div className='flex flex-col gap-4'>
            {mapDoc?.customFields?.map((field, index) => {
                const existing = customResponses.find(r => r.fieldName === field.fieldName);
                return (
                <input
                    key={index}
                    className='px-4 py-4 rounded-md bg-white text-black'
                    placeholder={field.fieldName}
                    value={existing?.response || ""}
                    onChange={(e) => handleCustomChange(field.fieldName, e.target.value)}
                />
                );
            })}
            </div>
            </>
            )}

            <div className='flex flex-col items-center'>
            <Button className="mt-4" type="submit" 
                onClick={() => saveUser({ name, age, contact, role, customResponses }).catch( (e)=> 
                alert("something broke: " + e.message)
                )
                }
                >
                ping myself on the map!
            </Button>
            </div>
        </div>

        <div className="w-3/5 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-600 text-xl">Map will be displayed here</div>
        </div>
    </main>
    )
}