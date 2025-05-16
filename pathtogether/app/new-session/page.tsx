// import { Select } from "@headlessui/react";
// import clsx from "clsx";
// import { Fragment } from 'react'

export default function newSession() {
  return (
    <main className="w-full h-screen flex">
        <div className="w-2/5 pt-4 pl-4 pr-4">
          <div className="text-2xl text-center mb-4">create a new map!</div>
          <div className="flex flex-col">
            <div className="mb-2">which group are you generating the map for?</div>
            <input className="px-4 py-4 rounded-md bg-white text-black"></input>
            <div className="mt-4">how do you want to name the map?</div> 
            <div className="text-gray-400 text-sm mb-2">this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end</div>
            <input className="px-4 py-4 rounded-md bg-white text-black"></input>
            <div className="mt-4">choose an existing template if you want!</div>
            <div className="flex flex-col items-center">
              <select className="bg-gray-800 px-1 py-2 rounded-md text-center">
                <option>remote/online friends</option>
                <option>high school seniors</option>
                <option>college grads</option>
                <option>alumni connects</option>
              </select>
            </div>
            <div className="mt-4">didn't find one template that suits you? add your own entries!</div>
        </div>
        </div>
    </main>
  )
}