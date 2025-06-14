import type { IUser } from "@/lib/models/Session";
import { useUserActions } from "@/hooks/useUserActions";
import Link from "next/link";

type Props = {
    sessionNo: string;
    user: IUser;
    refreshUsers: () => void;
};

export default function Card({ sessionNo, user, refreshUsers }: Props) {
    const { deleteUser } = useUserActions();

    return (
        <div className="relative border rounded-xl p-4 shadow bg-gray-200 min-w-[250px] min-h-[150px]">
            <h2 className="font-bold text-lg text-black">{user.name}</h2>
            <div>
            {Object.entries(user).map(([key, value]) => {
                if (key === "name" || key === "customResponses" || key === "_id" || typeof value === "object") return null;
                    return (
                        <p key={key} className='text-sm text-gray-600'>
                            {/* {key.charAt(0).toUpperCase() + key.slice(1)}: {value} */}
                            {key}: {value}
                        </p>
                    );
                })}
                {user.customResponses?.map((res, index) => ( // custom responses
                    <p key={`custom-${index}`} className="text-sm text-gray-600">
                    {res.fieldName}: {res.response}
                    </p>
                ))}
                {user.location && user.location.displayName && ( // location
                    <p className="text-sm text-gray-600">location: {user.location.displayName}</p>
                )}
            </div>
            <div className="absolute grid-cols-2 grid top-1 right-2">
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
    );
}