// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'

export default function newSession() {
  return (
    <main className="w-full h-screen">
        <div className="w-2/5">
            <div>which group are you generating the map for?</div>
            <input placeholder=""></input>
            <div>how do you want to name the map? (this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end)</div>
            <input placeholder=""></input>
            <div>choose an existing template if you want!
            </div>
            <div>what information would you like to include?</div>
        </div>
    </main>
  )
}