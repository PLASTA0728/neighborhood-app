import Link from "next/link";
import { Frown } from "lucide-react";

export default async function NotFound() {
    return(
    <main>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-items-center">
            <Frown className="size-15"/>
            <h2 className="text-2xl my-3 ">404 - Session Not Found</h2>
            <Link href={"/"} className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white">return to frontpage</Link>
        </div>
    </main>
    );
}