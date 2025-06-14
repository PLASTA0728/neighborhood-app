import { useState, useEffect } from "react";
import { useUserActions } from "./useUserActions";
import { ICustomResponse, IUser, ILocation } from "@/utils/types";

export function useSharedUserFormLogic(sessionNo: string) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [customResponses, setCustomResponses] = useState<ICustomResponse[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [users, setUsers] = useState([]);
  const { fetchUsers } = useUserActions();

  const handleCustomChange = (fieldName: string, value: string) => {
        setCustomResponses(prev => {
            const existing = prev.find(r => r.fieldName === fieldName);
            if (existing) {
                return prev.map(r =>
                    r.fieldName === fieldName ? { ...r, response: value } : r
                );
            } else {
                return [...prev, { fieldName, response: value }];
            }
        });
    };

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers(sessionNo.toString());
            if (data) setUsers(data);
        }
        loadUsers();
    }, [fetchUsers, sessionNo]);

  return {
    name, setName,
    age, setAge,
    contact, setContact,
    role, setRole,
    customResponses, setCustomResponses,
    enabled, setEnabled,
    location, setLocation,
    users, setUsers,
    handleCustomChange
  };
}
