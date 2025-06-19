import type { IUser } from "@/utils/types";
import { useUserActions } from "@/hooks/useUserActions";
import Link from "next/link";
import React from "react";
import { InfoWindow } from "@vis.gl/react-google-maps";

type Props = {
  sessionNo: string;
  user: IUser;
  refreshUsers: () => void;
} & Record<string, any>;

export default function Popup({ sessionNo, user, refreshUsers, ...props }: Props) {
    const { deleteUser } = useUserActions();

    return (
        <InfoWindow className="min-w-[200px] max-w-[300px]" {...props}>
            <div className="absolute top-3 flex items-center gap-4">
                <h2 className="font-bold text-lg text-black whitespace-nowrap">{user.name}</h2>
                <div className="flex items-center gap-2">
                    <Link href={`/${sessionNo}/edit/${user._id}`} className="text-gray-700 hover:underline">edit</Link>
                    <div className="text-red-500 hover:underline focus:text-red-800" 
                        onClick={async () => {
                            try {
                                await deleteUser(user._id.toString(), sessionNo);
                                await refreshUsers();
                            } catch (e) {
                                alert("something broke :( " + e.message);
                            }
                    }}>
                        delete
                    </div>
                </div>
            </div>
            <div>
            {Object.entries(user).map(([key, value]) => {
                if (key === "name" || key === "customResponses" || key === "_id" || typeof value === "object" || value===null || value===undefined || value.trim() === "") return null;
                    return (
                        <p key={key} className='text-sm text-gray-600'>
                            {/* {key.charAt(0).toUpperCase() + key.slice(1)}: {value} */}
                            {key}: {value}
                        </p>
                    );
                })}
                {user.customResponses?.map((res, index) => {
                    if (!res.fieldName || !res.response || res.response.trim()==="") return null;
                    
                    return ( // custom responses
                        <p key={`custom-${index}`} className="text-sm text-gray-600">
                        {res.fieldName}: {res.response}
                        </p>
                    );
                })}
                {user.location && user.location.displayName && ( // location
                    <p className="text-sm text-gray-600">location: {user.location.displayName}</p>
                )}
            </div>
            
        </InfoWindow>
    );
}