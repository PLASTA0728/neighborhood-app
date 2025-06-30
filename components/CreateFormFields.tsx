import FormInput from "./FormInput"
import { Plus, Minus } from "lucide-react"
import { cousine } from "@/ui/fonts"
import React from "react"

type Props = {
    groupName: string
    setGroupName: (val: string) => void
    mapName: string
    setMapName: (val: string) => void
    template: string
    setTemplate: (val: string) => void
    currentField: any
    setCurrentField: (val: any) => void
    customFields: any
    removeField: (index: number) => void
    addField: () => void
    errors: { groupName?: string; mapName?: string; currentFieldName?: string; };
    setErrors: React.Dispatch<React.SetStateAction<{ groupName?: string; mapName?: string; currentFieldName?: string; }>>;
}

export default function CreateFormFields({
    groupName, setGroupName,
    mapName, setMapName,
    template, setTemplate,
    currentField, setCurrentField,
    customFields,
    removeField,
    addField,
    errors,
    setErrors,
}: Props) {


  return (
      <>
      <div className="text-2xl text-center mb-4 text-gray-900 dark:text-white">create a new map!</div>
        <div className="flex flex-col">
          <div className="mb-2">which group are you generating the map for?</div>
          <FormInput placeholder="my group" value={groupName} 
            onChange={(val) => {
              setGroupName(val);
              if (errors.groupName) setErrors(prev => ({ ...prev, groupName: undefined }));
          }}/>
          {errors.groupName && (
            <p className="mt-1 text-sm !text-red-500">{errors.groupName}</p>
          )}
          <div className="mt-4">how do you want to name the map?</div> 
          <div className="text-gray-400 text-sm mb-2">this would be the name of how it is stored on our server-end, but every member who export the map can customize on their end</div>
          <FormInput placeholder="map name" value={mapName} 
            onChange={(val) => {
              setMapName(val);
              if (errors.mapName) setErrors(prev => ({ ...prev, mapName: undefined }));
          }}/>
          {errors.mapName && (
            <p className="mt-1 text-sm !text-red-500">{errors.mapName}</p>
          )}
          <div className="mt-4">choose an existing template if you want!</div>
          <div className="flex flex-col items-center mt-2">
            <select className="bg-white border border-gray-300 dark:bg-gray-600 dark:border-gray-600 px-1 py-2 rounded-md text-center"
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
          <select className="bg-white border border-gray-300 dark:bg-gray-600 dark:border-gray-600 px-1 py-2 rounded-md text-center"
            value={currentField.fieldType}
            onChange={(e) => setCurrentField({ ...currentField, fieldType: e.target.value })}
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
            <option value="date">date</option>
          </select>
          <button 
            className="bg-gray-800 text-center rounded-full text-white" 
            type="button"
            onClick={() => {
              addField();
              if (errors.currentFieldName) setErrors(prev => ({ ...prev, currentFieldName: undefined }));
          }}>
            <Plus size={16} />
          </button>
        </div>
        {errors.currentFieldName && (
          <p className="mt-1 text-sm !text-red-500">{errors.currentFieldName}</p>
        )}

        {customFields.length >0 && (
          <div className="mt-4">
            <div>added fields</div>
            <div>
              {customFields.map((field, index) => (
                <div key={index} className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <span className="text-gray-400">{field.fieldName}</span>
                    <span className={`${cousine.className} text-gray-600 bg-gray-100 ml-2 rounded-md px-2 text-sm dark:bg-gray-600 dark:text-gray-200`}>{field.fieldType}</span>
                  </div>
                  <button type="button" onClick={() => removeField(index)} className="text-white !bg-red-500 text-center rounded-full">
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
  )
}