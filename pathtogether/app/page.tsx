'use client';

import { useRef, useState } from "react";
import { jost } from "@/ui/fonts";
import Link from "next/link";
import SessionInput from "@/components/SessionInput";
import AnimatedMap from "@/components/AnimatedMap";
import useMouseGradient from "@/hooks/useMouseGradient";
import  "@/ui/styles/page.css";

export default function App() {
  const [submittedSessionNo, setSubmittedSessionNo] = useState("");
  const appRef = useRef(null);

  useMouseGradient(appRef);
  
  return (
    <div className="static">
      <div className="absolute -z-10 w-full h-full" id="app" ref={appRef} data-scroll-container></div>
      <div className="absolute bg-black z-0 w-full h-full opacity-65"></div>
      <AnimatedMap />
      <div className={`${jost.className} z-20 absolute top-1/2 left-1/7`}>
        <div className="text-6xl font-normal">PathTogether</div>
        <div className="text-3xl font-extralight">one map, every destination</div>
      </div>
      <div className="absolute top-1/2 left-3/5">
      <SessionInput value={submittedSessionNo} onChange={setSubmittedSessionNo} />
      <Link href={"/new-session"} className="relative left-4 top-2">don&apos;t have one? generate now!</Link>
      </div>
    </div>
  );
}