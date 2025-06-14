import type { ICustomResponse } from "./types";

export async function saveUser(
    sessionNo: string,
    payload: {
        name: string;
        age: string;
        contact: string;
        role: string;
        location?: {
            id: string;
            coordinates: [number, number];
            displayName: string;
        };
        customResponses: ICustomResponse[];
    }
) {
    const fullPayload = { ...payload, sessionNo };

    const res = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullPayload),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`save failed: ${msg}`);
    }

    return res.json();
}