'use client'

import { useState } from "react"

export type CustomField = {
    fieldName: string;
    fieldType: string;
};

type Payload = {
    groupName: string;
    mapName: string;
    template: string;
    customFields: CustomField[];
};

export function useSessionManager() {
    const [sessionNo, setSessionNo] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [hasCreatedSession, setHasCreatedSession] = useState(false);
    const [hasUpdatedSession, setHasUpdatedSession] = useState(false);

    async function createSession(): Promise<string> {
        const res = await fetch("/api/generate-session", {
            method: "POST",
        });

        const data = await res.json();
        if (!data.sessionNo) throw new Error("Session creation failed");

        setSessionNo(data.sessionNo);
        setHasCreatedSession(true);
        return data.sessionNo;
    }

    async function shareSession(payload: Payload) {
        let finalSessionNo = sessionNo;

        if (!hasCreatedSession) {
            finalSessionNo = await createSession();
        }

        const fullPayload = {
            ...payload,
            sessionNo: finalSessionNo,
        };

        const endpoint = hasCreatedSession
            ? `/api/map/update?sessionNo=${finalSessionNo}`
            : "/api/map/create";

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fullPayload),
        });

        const data = await res.json();

        if (data.success) {
            setShowPopup(true);
            if (hasCreatedSession) setHasCreatedSession(true);
        } else {
            throw new Error(data.error || "server error");
        }
    }

    return {
        sessionNo,
        showPopup,
        setShowPopup,
        hasUpdatedSession,
        setHasUpdatedSession,
        shareSession,
    };
}