"use client"

import { useRouter } from "next/navigation";

export function useSessionSubmit(submittedSessionNo, setSubmittedSessionNo) {
    const router = useRouter();

    const submit = async () => {
        if (submittedSessionNo.trim() === "") return;
        setSubmittedSessionNo(submittedSessionNo);
        router.push(`${submittedSessionNo}/edit`);

        // const res = await fetch(`/api/check-session?sessionNo=${submittedSessionNo}`);
        // const data = await res.json();
        // if (data.success) {
        //     console.log(`found session ${submittedSessionNo}, redirecting to edit page ...`);
        //     router.push(`${submittedSessionNo}/edit`);
        // } else {
        //     alert("session not found. plz check the session code");
        //     console.error("session not found: ", data.error);
        //     setSubmittedSessionNo("");
        // }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    return { submit, handleKeyDown }
}


