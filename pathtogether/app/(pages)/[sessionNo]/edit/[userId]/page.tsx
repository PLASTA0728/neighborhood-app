'use client'
import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import type { IUser } from '@/utils/types';
import { useUserActions } from '@/hooks/useUserActions'
import Panel from '@/components/Panel'
import { SquareLoader } from 'react-spinners'
import { useUserFormData } from '@/hooks/useUserFormData'
import FormFields from '@/components/UserFormFields'


export default function EditUser() {
    const { sessionNo, userId } = useParams();
    const router = useRouter();
    const { updateUser, fetchUsers } = useUserActions();
    const [mapDoc, setMapDoc] = useState(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const [enabled, setEnabled] = useState(false);
    
    const {
        loading,
        name, setName, 
        age, setAge,
        contact, setContact,
        role, setRole,
        location, setLocation,
        customResponses, setCustomResponses
    } = useUserFormData(sessionNo.toString(), userId.toString());
    
    const refreshUsers = useCallback(async () => {
        const data = await fetchUsers(sessionNo.toString());
        if (data) setUsers(data);
    }, [fetchUsers, sessionNo]);
    
    useEffect(() => {
        const fetchMap = async() => {
            try {
                const res = await fetch(`/api/map/get?sessionNo=${sessionNo}`);
                const data = await res.json();

                if (!data.success || !data.map) {
                    router.push('/not-found');
                } else {
                    setMapDoc(data.map);
                }
            } catch (error) {
                console.error("failed to fetch map data:", error);
                router.push('/not-found');
            }
        };
        if (sessionNo) {
            fetchMap();
            const loadUsers = async () => {
                const data = await fetchUsers(sessionNo.toString());
                if (data) setUsers(data);
            }
            loadUsers()
        }
    }, [sessionNo, router, fetchUsers]);

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

    if (loading) return (
        <div>
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <SquareLoader color="#94a3b8"/>
              <p className='text-sm'>loading...</p>
            </div>
        </div>
    )

    return (
    <main className="relative w-full">
        <div className='flex flex-col sm:flex-row min-h-screen sm:h-screen w-full'>
            <div className="w-full mb-6 sm:w-[400px] pt-4 pl-4 pr-4 relative sm:overflow-y-auto sm:h-full">
                <div className='text-2xl text-center'>
                you are now editing <span className='text-emerald-400'>{name}</span>&apos;s info on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}> 
                    session code: {mapDoc?.sessionNo}
                <br></br>
                    user id: {userId} 
                </div>

                <FormFields name={name}
                    setName={setName}
                    age={age}
                    setAge={setAge}
                    contact={contact}
                    setContact={setContact}
                    role={role}
                    setRole={setRole}
                    setLocation={setLocation}
                    enabled={enabled}
                    setEnabled={setEnabled}
                    mapDoc={mapDoc}
                    customResponses={customResponses}
                    handleCustomChange={handleCustomChange}
                />

                <div className='flex flex-col items-center mb-4'>
                <Button
                    className="mt-4"
                    type="submit"
                    onClick={async () => {
                        try {
                            await updateUser(sessionNo.toString(), userId.toString(), {
                                name, 
                                age,
                                contact,
                                role, 
                                location,
                                customResponses, 
                            });
                            alert("user updated!");
                            const data = await fetchUsers(sessionNo.toString());
                            if (data) setUsers(data);
                        } catch (e) {
                            alert("something broke :( " + e.message);
                        }
                        router.push(`/${sessionNo}/edit`)
                    }}
                >
                    push my changes
                </Button>
                </div>
            </div>
            <Panel sessionNo={sessionNo.toString()} users={users} refreshUsers={refreshUsers}/>
            
        </div>
    </main>
    )
}