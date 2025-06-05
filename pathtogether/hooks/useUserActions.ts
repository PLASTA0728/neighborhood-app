import { RollerCoaster } from "lucide-react";
import { useCallback } from "react";

export function useUserActions() {
    const deleteUser = async (id: string, sessionNo: string) => {
        try {
            const res = await fetch(`/api/user/${id}?sessionNo=${sessionNo}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("DELETE failed with ", data);
                throw new Error("Failed to delete user");
            }

            return data;
        } catch (err) {
            console.error("failed to delete user", err);
        }
    };

    const fetchUsers = useCallback(async (sessionNo: string) => {
        try {
            const res = await fetch(`/api/user/get?sessionNo=${sessionNo}`);
            if (!res.ok) {
                const text = await res.text();
                console.error("api returned error:" , res.status, text);
                return null;
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error("failed to fetch users", err);
            return null;
        }
    }, []);

    const fetchSingleUser = async (userId: string, sessionNo: string) => {
        const res = await fetch(`/api/user/${userId}?sessionNo=${sessionNo}`);
        const text = await res.text();
        if (!res.ok) {
            console.error("api returned error:", res.status, text);
            throw new Error(`Failed to fetch user: ${text}`);
        }
        if (!text) {
            console.error("api returned empty response");
            throw new Error("No user data found");
        }
        const data = JSON.parse(text);
        if (!data.success) throw new Error(data.error || "Failed to fetch user");
        return data.user;
    }
    
    const updateUser = async (sessionNo: string, userId: string, userData: any) => {
        try {
            const res = await fetch(`/api/user/${userId}?sessionNo=${sessionNo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to update user");
            return data.result;
        } catch (err) {
            console.error("failed to update user", err);
            throw err;
        }
    }

    return { 
        deleteUser, 
        fetchUsers, 
        fetchSingleUser,
        updateUser,
    };
}