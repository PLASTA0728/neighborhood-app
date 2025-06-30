"use client"

import { useEffect, useState, ReactNode } from "react"

export default function Hydrated({ children, fallback = null, }: {children: ReactNode; fallback?: ReactNode;}) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        console.log("client mounted")
        setIsHydrated(true);
    }, []);

    if (!isHydrated) return <>{fallback}</>;

    return <div className="bg-red-500">{children}</div>
}