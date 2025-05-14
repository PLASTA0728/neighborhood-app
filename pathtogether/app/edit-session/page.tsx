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
        <main className="w-full h-screen">
            <div className="w-2/5 pl-5 pt-4">
                <input className="relative my-3 w-80 px-4 py-4 rounded-md bg-white text-black margin-20" placeholder="my name"></input>
                <input className="relative my-3 w-80 px-4 py-4 rounded-md bg-white text-black margin-20" placeholder="my age"></input>
                <input className="relative my-3 w-80 px-4 py-4 rounded-md bg-white text-black margin-20" placeholder="my contact"></input>
                <input className="relative my-3 w-80 px-4 py-4 rounded-md bg-white text-black margin-20" placeholder="my location"></input>
                <div id="blurred-location" className='relative w-full'>
                    <div className='inline-block'>blurred location</div>
                    <div className="inline-block absolute left-80 -translate-x-2/2" id='switch'>
                    <Switch checked={enabled} onChange={setEnabled}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white">
                    <span aria-hidden="true" className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                    />
                    </Switch>
                    </div>
                    <div>if you rather prefer share a relatively blurred location, we will handle this for you! this will neither be stored in our dataset.</div>
                </div>
                <Button className="mt-4" type="submit">pin myself on the map!</Button>
            </div>
        </main>
    )
}