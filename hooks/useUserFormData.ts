import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ICustomResponse, IUser, ILocation } from "@/utils/types";
import { useUserActions } from "./useUserActions";

export function useUserFormData(sessionNo: string, userId: string) {
    const router = useRouter();
    const { fetchSingleUser } = useUserActions();

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");
    const [customResponses, setCustomResponses] = useState<ICustomResponse[]>([]);
    const [location, setLocation] = useState<ILocation | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user = await fetchSingleUser(userId, sessionNo);
                if (!user) {
                    console.error("user not found")
                    router.push('/not-found');
                } else {
                    setName(user.name || "");
                    setAge(user.age || "");
                    setContact(user.contact || "");
                    setRole(user.role || "");
                    setCustomResponses(user.customResponses || []);
                    setLocation(user.location || null);
                }
            } catch (err) {
                console.error("failed to fetch user data", err);
            } finally {
                setLoading(false);
            }
        };

        if (sessionNo && userId) fetchData();
    }, [sessionNo, userId, router]);

    return {
        loading,
        name, setName,
        age, setAge,
        contact, setContact,
        role, setRole,
        location, setLocation,
        customResponses, setCustomResponses
    }
}
    // const handleCustomChange = (fieldName: string, value: string) => {
    //         setCustomResponses(prev => {
    //             const existing = prev.find(r => r.fieldName === fieldName);
    //             if (existing) {
    //                 return prev.map(r =>
    //                     r.fieldName === fieldName ? { ...r, response: value } : r
    //                 );
    //             } else {
    //                 return [...prev, { fieldName, response: value }];
    //             }
    //         });
    //     };

    //     useEffect(() => {
    //         const loadUsers = async () => {
    //             const data = await fetchUsers(sessionNo.toString());
    //             if (data) setUsers(data);
    //         }
    //         loadUsers();
    //     }, [fetchUsers, sessionNo]);

    // return {
    //     name, setName,
    //     age, setAge,
    //     contact, setContact,
    //     role, setRole,
    //     customResponses, setCustomResponses,
    //     enabled, setEnabled,
    //     location, setLocation,
    //     users, setUsers,
    //     handleCustomChange
    // };