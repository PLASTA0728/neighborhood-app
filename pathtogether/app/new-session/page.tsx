'use client'

import { useState, useEffect } from "react"
import { Button } from "@/ui/button"
import { Plus, Minus } from "lucide-react";
import { cousine } from "@/ui/fonts";
import { useSessionManager } from "@/hooks/useSessionManager";
import { getFieldsForTemplate } from '@/lib/getFieldsForTemplate'
import FormInput from "@/components/FormInput";
// import { generateUniqueSessionNo } from "@/app/lib/session-generator";


export default function NewSession() {
  const { // hooks must be inside
    sessionNo,
    showPopup,
    setShowPopup,
    hasUpdatedSession,
    setHasUpdatedSession,
    shareSession,
  } = useSessionManager();

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

  function hideSessionNo() {
    setShowPopup(false);
    setHasUpdatedSession(true);
  }

  useEffect(() => {
    const fields = getFieldsForTemplate(template);
    setCustomFields(fields);
  }, [template])

  return (
    <main className="relative w-full h-screen">
      <div className="flex flex-col sm:flex-row h-screen w-full">
        <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 flex flex-col relative">
          <div className="text-2xl text-center mb-4">create a new map!</div>
          <div className="flex flex-col">
            <div className="mb-2">which group are you generating the map for?</div>
            <FormInput placeholder="my group" value={groupName} onChange={setGroupName}/>
            <div className="mt-4">how do you want to name the map?</div> 
            <div className="text-gray-400 text-sm mb-2">this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end</div>
            <FormInput placeholder="map name" value={mapName} onChange={setMapName}/>
            <div className="mt-4">choose an existing template if you want!</div>
            <div className="flex flex-col items-center mt-2">
              <select className="bg-gray-800 px-1 py-2 rounded-md text-center"
                value={template} onChange={(e) => setTemplate(e.target.value)}>
                <option> - </option>
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
          <Button
            className="
              mt-6 
              sm:fixed sm:right-10 sm:bottom-10 
              z-30 
              self-center sm:self-auto
            "
            onClick={() =>
              shareSession({ groupName, mapName, customFields }).catch((e) =>
                alert("something broke: " + e.message)
              )
            }
          >
            share my session!
          </Button>
        </div>
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-10">
          {/* You can later replace this with a real map component */}
          <div className="text-gray-600 text-xl">walkthrough on how to create the map and promotion of different styles will be displayed here</div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-40">
          <div className="absolute w-full h-full bg-black opacity-60 z-20" onClick={hideSessionNo}></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-45 bg-white z-30 rounded-md text-gray-800 p-4">
            { !hasUpdatedSession && (
              <div>
                your session code has been generated successfully 🎉 you can share this with your friends to join the map.
              </div>
            )}
            { hasUpdatedSession && (
              <div>
                your map setting has been updated successfully 🎉 use the same session code to share to your friends.
              </div>
            )}
            <div className="text-center text-2xl font-bold mt-2">
              {`session code: ${sessionNo}`}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}