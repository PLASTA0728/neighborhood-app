'use client'
// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { Button } from "../ui/button"

export default function editSession() {
    const [enabled, setEnabled] = useState(false)

    return (
        <main className="w-full h-screen flex">
            <div className="w-2/5 pt-4 pl-4 pr-4">
                <div className='text-2xl text-center mb-4'>take me on the map!</div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                    <input className="relative px-4 py-4 rounded-md bg-white text-black" placeholder="my name"></input>
                    <input className="relative px-4 py-4 rounded-md bg-white text-black" placeholder="my age"></input>
                    <input className="relative px-4 py-4 rounded-md bg-white text-black" placeholder="my contact"></input>
                    <input className="relative px-4 py-4 rounded-md bg-white text-black" placeholder="my role"></input>
                </div>
                <div className='flex flex-col'>
                    <input className='px-4 py-4 rounded-md bg-white text-black' placeholder='my location' />
                </div>
                <div id="blurred-location" className='mt-4 flex justify-between'>
                    <div>blurred location</div>
                    <div id='switch'>
                    <Switch checked={enabled} onChange={setEnabled}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-600 data-focus:outline data-focus:outline-white">
                    <span aria-hidden="true" className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                    />
                    </Switch>
                    </div>
                </div>
                <div className='text-gray-400 text-sm mt-2'>if you rather prefer share a relatively blurred location, we will handle this for you! this will neither be stored in our dataset.</div>
                <div className='flex flex-col items-center'>
                    <Button className="mt-4" type="submit">
                    ping myself on the map!
                    </Button>
                </div>
            </div>
            <div className="w-3/5 bg-gray-200 flex items-center justify-center">
                {/* You can later replace this with a real map component */}
                <div className="text-gray-600 text-xl">Map will be displayed here</div>
            </div>
        </main>
    )
}