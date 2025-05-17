'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Plus, Minus } from "lucide-react";
import { Cousine } from "./ui/fonts"; 
import { cousine } from "../ui/fonts";

export default function newSession() {
  const [customFields, setCustomFields] = useState([]);
  const [currentField, setCurrentField] = useState({ name: "", type: "string" });

  const addField = () => {
    if (currentField.name.trim() === "") return;
    setCustomFields([...customFields, currentField]);
    setCurrentField({ name: "", type: "string" });
  };

  const removeField = (indexToRemove) => {
    setCustomFields(customFields.filter((_, index) => index !== indexToRemove));
  };

  return (
    <main className="w-full h-screen flex">
        <div className="w-2/5 pt-4 pl-4 pr-4">
          <div className="text-2xl text-center mb-4">create a new map!</div>
          <div className="flex flex-col">
            <div className="mb-2">which group are you generating the map for?</div>
            <input className="px-4 py-4 rounded-md bg-white text-gray-400" placeholder="my group"></input>
            <div className="mt-4">how do you want to name the map?</div> 
            <div className="text-gray-400 text-sm mb-2">this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end</div>
            <input className="px-4 py-4 rounded-md bg-white text-gray-400" placeholder="map name"></input>
            <div className="mt-4">choose an existing template if you want!</div>
            <div className="flex flex-col items-center mt-2">
              <select className="bg-gray-800 px-1 py-2 rounded-md text-center">
                <option>remote/online friends</option>
                <option>high school seniors</option>
                <option>college grads</option>
                <option>alumni connects</option>
              </select>
            </div>
          </div>
          <div className="mt-4">didn&apos;t find one template that suits you? add your own entries!</div>
          <div className="flex justify-between items-center mt-2">
            <input type="text" placeholder="entry name" className="p-2 bg-white rounded-md text-gray-400 w-2/3" 
              value={currentField.name} 
              onChange={(e)=> setCurrentField({...currentField, name: e.target.value})}
            />
            <select className="bg-gray-800 px-1 py-2 rounded-md text-center"
              value={currentField.type}
              onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="date">date</option>
            </select>
            <button className="bg-gray-800 text-center rounded-full text-white" type="button" onClick={addField}>
              <Plus size={16} />
            </button>
          </div>

          {customFields.length >0 && (
            <div className="mt-4">
              <div>added fields</div>
              <div>
                {customFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="text-gray-400">{field.name}</span>
                      <span className={`${cousine.className} text-gray-600 bg-gray-100 ml-2 rounded-md px-2 text-sm`}>{field.type}</span>
                    </div>
                    <button type="button" onClick={() => removeField(index)} className="text-white bg-red-500 text-center rounded-full">
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
        <div className="w-3/5 bg-gray-100 flex items-center justify-center p-10">
          {/* You can later replace this with a real map component */}
          <div className="text-gray-600 text-xl">walkthrough on how to create the map and promotion of different styles will be displayed here</div>
        </div>
        <Button className="fixed right-1/20 bottom-1/20">share my session!</Button>
    </main>
  );
}