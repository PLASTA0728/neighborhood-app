'use client' 
import { useState } from "react"
import { Switch } from "@headlessui/react"
import FormInput from "./FormInput"
import CustomFieldList from "./CustomFieldList"
import LocationInput from "./LocationInput"
import { Button } from "@/ui/button"
import type { IUser, ILocation, ICustomResponse } from '@/utils/types';
import { cousine } from "@/ui/fonts"



type Props = {
    mapDoc: any
    initialUser?: Partial<IUser>
    onSubmit: (data: {
        name: string
        age: string
        contact: string
        role: string
        location: ILocation | null
        customResponses: ICustomResponse[]
    }) => Promise<void>
    submitLabel: string
}

export default function UserForm({ mapDoc, initialUser, onSubmit }: Props) {
    const [name, setName] = useState(initialUser?.name || "")
    const [age, setAge] = useState(initialUser?.age || "")
    const [contact, setContact] = useState(initialUser?.contact || "")
    const [role, setRole] = useState(initialUser?.role || "")
    const [customResponses, setCustomResponses] = useState<ICustomResponse[]>(initialUser?.customResponses || [])
    const [location, setLocation] = useState<ILocation | null>(initialUser?.location || null)
    const [enabled, setEnabled] = useState(false)
    
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

    return (
        <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 relative">
            <div className='text-2xl text-center'>
                {initialUser ? (
                    <>you are now editing <span className='text-emerald-400'>{name}</span>&apos;s info on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map</>
                ) : (
                    <>take me on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map for <span className='text-emerald-400'>{mapDoc?.groupName}</span>!</>
                )}
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
                <LocationInput onPlaceSelect={(location) => setLocation(location)} />
            </div>

            <div className='mt-4 flex justify-between'>
                <div>blurred location</div>
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
                    await onSubmit({ name, age, contact, role, location, customResponses })
                }}
            >
                pin myself on the map!
            </Button>
            </div>
        </div>
    )
}