'use client'

import { useState } from "react"
import { Button } from "@/app/ui/button"
import { Plus, Minus } from "lucide-react";
import { cousine } from "@/app/ui/fonts";
// import { generateUniqueSessionNo } from "@/app/lib/session-generator";

export default function NewSession() {
  // database
  const [groupName, setGroupName ] = useState("");
  const [mapName, setMapName ] = useState("");
  const [template, setTemplate ] = useState("");

  // initialize for the states that are used on frontend
  type CustomField = {
    fieldName: string;
    fieldType: string;
  };

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [currentField, setCurrentField] = useState<CustomField>({ fieldName: "", fieldType: "string" });

  const addField = () => {
    if (currentField.fieldName.trim() === "") return;
    setCustomFields([...customFields, currentField]);
    setCurrentField({ fieldName: "", fieldType: "string" });
  };

  const removeField = (indexToRemove: number) => {
    setCustomFields(customFields.filter((_, index) => index !== indexToRemove));
  };

  // popup and show session
  const [sessionNo, setSessionNo] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  async function createSession() {
    const res = await fetch("api/generate-session", {
      method: "POST",
    });
    const data = await res.json();
    console.log("your session number is ", data.sessionNo);
    return data.sessionNo;
  }

  // post session function

  const shareSession = async () => {
    let finalSessionNo = sessionNo;

    if (!sessionNo) {
      finalSessionNo = await createSession();
      setSessionNo(finalSessionNo);
    }

    const payload = {
      groupName,
      mapName,
      template,
      customFields, 
      finalSessionNo,
    };


    try {
      const res = await fetch("api/map/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSessionNo(finalSessionNo);
        setShowPopup(true);
        console.log(payload);
      } else {
        alert("server error: " + data.error);
      }
    } catch (error) {
      console.error("Unexpected error", error);
      alert("unexpected error occured.");
    }
  };

  function hideSessionNo() {
    setShowPopup(false);
  }

  return (
    <main className="w-full h-screen flex">
        <div className="w-2/5 pt-4 pl-4 pr-4">
          <div className="text-2xl text-center mb-4">create a new map!</div>
          <div className="flex flex-col">
            <div className="mb-2">which group are you generating the map for?</div>
            <input className="px-4 py-4 rounded-md bg-white text-gray-400" placeholder="my group" 
              value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <div className="mt-4">how do you want to name the map?</div> 
            <div className="text-gray-400 text-sm mb-2">this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end</div>
            <input className="px-4 py-4 rounded-md bg-white text-gray-400" placeholder="map name" 
              value={mapName} onChange={(e) => setMapName(e.target.value)} />
            <div className="mt-4">choose an existing template if you want!</div>
            <div className="flex flex-col items-center mt-2">
              <select className="bg-gray-800 px-1 py-2 rounded-md text-center"
                value={template} onChange={(e) => setTemplate(e.target.value)} >
                <option>remote/online friends</option>
                <option>high school seniors</option>
                <option>college grads</option>
                <option>alumni connects</option>
              </select>
            </div>
          </div>
          <div className="mt-4">didn&apos;t find one template that suits you / want more customized fields? create your own!</div>
          <div className="flex justify-between items-center mt-2">
            <input type="text" placeholder="field name" className="p-2 bg-white rounded-md text-gray-400 w-2/3" 
              value={currentField.fieldName} 
              onChange={(e)=> setCurrentField({...currentField, fieldName: e.target.value})}
            />
            <select className="bg-gray-800 px-1 py-2 rounded-md text-center"
              value={currentField.fieldType}
              onChange={(e) => setCurrentField({ ...currentField, fieldType: e.target.value })}
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
                      <span className="text-gray-400">{field.fieldName}</span>
                      <span className={`${cousine.className} text-gray-600 bg-gray-100 ml-2 rounded-md px-2 text-sm`}>{field.fieldType}</span>
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
        <Button className="fixed right-1/20 bottom-1/20" onClick={shareSession}>share my session!</Button>
        {showPopup && sessionNo && (
          <div className="fixed inset-0 z-10">
            <div className="absolute w-full h-full bg-black opacity-60 z-20" onClick={hideSessionNo}></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-45 bg-white z-30 rounded-md text-gray-800 p-4">
              <div>
                your session code has been generated successfully 🎉 you can share this with your friends to join the map.
              </div>
              <div className="text-center text-2xl font-bold mt-2">
                {`session code: ${sessionNo}`}
              </div>
            </div>
          </div>
        )}
    </main>
  );
}