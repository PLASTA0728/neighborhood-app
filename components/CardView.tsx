import type { IUser } from "@/utils/types";
import Card from "./Card";

type Props = {
  sessionNo: string;
  users: IUser[];
  refreshUsers: () => void;
}

export default function CardView({sessionNo, users, refreshUsers}: Props) {
  return (
    <div className="p-4">
      <div className='mt-16 flex flex-wrap gap-4 justify-start'>
        {users.length > 0 ? (
            users.map((user, i) => (
                <Card key={i} sessionNo={sessionNo} user={user} refreshUsers={refreshUsers} />
            ))
        ) : (
            <p className='text-sm text-gray-400 text-center'>
                no users. <span className='inline italic'>yet?</span>
            </p>
        )}
    </div>
  </div>
  )
}