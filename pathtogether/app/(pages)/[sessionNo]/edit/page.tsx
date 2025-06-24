'use client'
import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { cousine } from '@/ui/fonts'
import { saveUser } from '@/utils/saveUser'
import type { IUser, ILocation, ICustomResponse } from '@/utils/types'
import { useUserActions } from '@/hooks/useUserActions'
import Panel from '@/components/Panel'
import { SquareLoader } from 'react-spinners'
import FormFields from '@/components/UserFormFields'
import useMediaQuery from '@/hooks/useMediaQuery'


export default function EditSession() {
    const smBreakpoint = useMediaQuery('(min-width:520px)')
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    
    const { sessionNo } = useParams();
    const router = useRouter();
    const [mapDoc, setMapDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enabled, setEnabled] = useState(false);
    const [isSaving, setIsSaving] = useState(false); 
    
    const [errors, setErrors] = useState<{ name?: string; location?: string; }>({});
    const validateSubmit = () => {
        const newErrors: Partial<typeof errors> = {};
        if (!name.trim()) newErrors.name = "please fill out your name!";
        if (location === null) newErrors.location = "please select a location!";
        setErrors((prev) => ({...prev, ...newErrors}));
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmitUser = async () => {
        if (!validateSubmit()) return;
        setIsSaving(true);
        console.log("sending to db:", location);
        try {
            await saveUser(sessionNo.toString(), {
                name, 
                age,
                contact,
                role, 
                location,
                customResponses
            });
            alert("user saved!");
            await new Promise(r => setTimeout(r, 300));
            const data = await fetchUsers(sessionNo.toString());
            if (data) setUsers(data);
        } catch (e) {
            alert("something broke: " + e.message + " :( ");
        }
        setIsSaving(false);
    }

    // for the change value of the custom fields
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("");

    // for auto generate custom fields 
    const [customResponses, setCustomResponses] = useState<ICustomResponse[]>([]);
    // for the user cards
    const [users, setUsers] = useState<IUser[]>([]);
    // for location
    const [location, setLocation] = useState<ILocation | null>(null);

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
    const { fetchUsers } = useUserActions();
    
    useEffect(() => {
        const fetchMap = async() => {
            setLoading(true);
            const res = await fetch(`/api/map/get?sessionNo=${sessionNo}`);
            const data = await res.json();

            if (!data.success || !data.map) {
                router.push('/not-found');
            } else {
                setMapDoc(data.map);
                setLoading(false);
            }
        };

        if (sessionNo) {
            fetchMap();
            const loadUsers = async () => {
                const data = await fetchUsers(sessionNo.toString());
                if (data) setUsers(data);
            }
            loadUsers();
        }
    }, [sessionNo, router, fetchUsers])
    // console.log(mapDoc);
    
    const refreshUsers = useCallback(async () => {
        const data = await fetchUsers(sessionNo.toString());
        if (data) setUsers(data);
    }, [fetchUsers, sessionNo]);

    if (loading) return (
        <div>
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <SquareLoader color="#94a3b8"/>
              <p className='text-sm'>loading...</p>
            </div>
        </div>
    )
    if (!isMounted) { return null; }

    return (
    <main className="relative w-full">
        <div className={`flex ${ smBreakpoint? 'flex-row h-screen' : 'flex-col min-h-screen'}`}>
            <div className={`${ smBreakpoint? 'w-[400px] overflow-y-auto h-full' : 'w-full'} mb-6 pt-4 pl-4 pr-4 relative`}>
                <div className='text-2xl text-center'>
                take me on the <span className="text-emerald-400">{mapDoc?.mapName}</span> map for <span className='text-emerald-400'>{mapDoc?.groupName}</span>!
                </div>
                <div className={`${cousine.className} text-gray-600 text-sm text-center mb-2`}>
                session code: {mapDoc?.sessionNo}
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
                    errors={errors}
                    setErrors={setErrors}
                />

                <div className='flex flex-col items-center mb-4'>
                <Button
                    className="mt-4"
                    type="submit"
                    onClick={handleSubmitUser}
                    disabled={isSaving}
                >
                    pin myself on the map!
                </Button>
                </div>
            </div>
            <Panel sessionNo={sessionNo.toString()} users={users} refreshUsers={refreshUsers}/>
        </div>
    </main>
    )
}