"use client"

import { useEffect } from "react";

export default function useMouseGradient(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        const moveGradient = (event: MouseEvent) => {
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            const mouseX = Math.round((event.pageX / winWidth) * 100);
            const mouseY = Math.round((event.pageY / winHeight) * 100);

            if (ref.current) {
                ref.current.style.setProperty("--mouse-x", `${mouseX}%`);
                ref.current.style.setProperty("--mouse-y", `${mouseY}%`);
            }
        };

        document.addEventListener("mousemove", moveGradient);
        return () => document.removeEventListener("mousemove", moveGradient);
    }, [ref]);
}