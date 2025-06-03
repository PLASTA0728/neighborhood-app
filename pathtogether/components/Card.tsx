import type { IUser } from "@/lib/models/Session";

type Props = {
    user: IUser;
};

export default function Card({ user }: Props) {
    return (
        <div className="border rounded-xl p-4 shadow bg-gray-200 min-w-[250px] min-h-[150px]">
            <h2 className="font-bold text-lg text-black">{user.name}</h2>

            {Object.entries(user).map(([key, value]) => {
                if (key === "name" || key === "customResponses" || key === "_id" || typeof value === "object") return null;
                    return (
                        <p key={key} className='text-sm text-gray-600'>
                            {/* {key.charAt(0).toUpperCase() + key.slice(1)}: {value} */}
                            {key}: {value}
                        </p>
                    );
                })}

                    {user.customResponses?.map((res, index) => (
                    <p key={`custom-${index}`} className="text-sm text-gray-600">
                    {res.fieldName}: {res.response}
                    </p>
                ))}
        </div>
    );
}