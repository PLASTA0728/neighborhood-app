"use client";

import FormInput from "./FormInput";
import LocationInput from "./LocationInput";
import { Switch } from "@headlessui/react";
import CustomFieldList from "./CustomFieldList";

type Props = {
  name: string;
  setName: (val: string) => void;
  age: string;
  setAge: (val: string) => void;
  contact: string;
  setContact: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  setLocation: (val: any) => void;
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  mapDoc: any;
  customResponses: any;
  handleCustomChange: (fieldName: string, value: string) => void;
  errors?: { name?: string; location?: string };
  setErrors?: React.Dispatch<React.SetStateAction<{name?: string; location?: string;}>>;
};

export default function FormFields({
  name,
  setName,
  age,
  setAge,
  contact,
  setContact,
  role,
  setRole,
  setLocation,
  enabled,
  setEnabled,
  mapDoc,
  customResponses,
  handleCustomChange,
  errors,
  setErrors,
}: Props) {
return (
    <>
      <div className="flex flex-col xs:grid xs:grid-cols-2 sm:max-smm:flex sm:max-smm:flex-col gap-4 pb-4">
  <div className="flex flex-col w-full">
    <FormInput
      placeholder="my name"
      value={name}
      onChange={(val) => {
        setName(val);
        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
      }}
    />
    {errors.name && (
      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
    )}
  </div>
  <div className="flex flex-col w-full">

    <FormInput
      placeholder="my age"
      value={age}
      onChange={setAge}
    />
  </div>
      </div>

<div className={`flex flex-col xs:grid xs:grid-cols-2 sm:max-smm:flex sm:max-smm:flex-col gap-4 pb-4 ${errors.name ? '-translate-y-3' : ''}`}>
  <div className="flex flex-col w-full">
    <FormInput
      placeholder="my contact"
      value={contact}
      onChange={setContact}
    />
  </div>

  <div className="flex flex-col w-full">
    <FormInput
      placeholder="my role"
      value={role}
      onChange={setRole}
    />
  </div>
</div>

<div className={`{flex flex-col w-full ${errors.name ? '-translate-y-2' : ''}}`}>
  <LocationInput
    onPlaceSelect={(location) => {
      setLocation(location);
      if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
    }}
  />
  {errors.location && (
    <p className="mt-0.5 text-sm text-red-500">{errors.location}</p>
  )}
</div>
      <div className="mt-4 flex justify-between">
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

      <div className="text-gray-400 text-sm mt-2">
        if you rather prefer share a relatively blurred location, we will handle
        this for you! this will neither be stored in our dataset.
      </div>

      {mapDoc?.customFields?.length > 0 && (
        <>
          <div className="text-xl mt-4 mb-2">custom fields</div>
          <CustomFieldList
            fields={mapDoc?.customFields || []}
            responses={customResponses}
            onChange={handleCustomChange}
          />
        </>
      )}
    </>
  );
}
