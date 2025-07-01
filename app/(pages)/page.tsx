'use client';

import { useRef, useState } from "react";
import { jost } from "@/ui/fonts";
import Link from "next/link";
import SessionInput from "@/components/SessionInput";
import AnimatedMap from "@/components/AnimatedMap";
import useMouseGradient from "@/hooks/useMouseGradient";
import  "@/ui/styles/page.css";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function App() {
  const pageBreakpoint =  useMediaQuery('(min-width:930px)');
  const [submittedSessionNo, setSubmittedSessionNo] = useState("");
  const appRef = useRef(null);

  useMouseGradient(appRef);
  
  return (
    <div className="static">
      <div className="absolute !bg-black -z-10 w-full h-full" id="app" ref={appRef} data-scroll-container></div>
      <div className="absolute !bg-black z-0 w-full h-full opacity-55"></div>
      <AnimatedMap />
      <div className={`${jost.className} z-20 absolute text-white ${ pageBreakpoint ? "top-1/2 left-1/7" : "top-2/5 left-1/2 transform -translate-x-1/2"}`}>
        <div className="text-6xl font-normal">PathTogether</div>
        <div className="text-3xl font-extralight">one map, every destination</div>
      </div> 
      <div className={`absolute ${pageBreakpoint ? "top-1/2 right-1/14" : "top-15/27 left-1/2 transform -translate-x-1/2 z-10"}`}>
      <SessionInput value={submittedSessionNo} onChange={setSubmittedSessionNo} />
      <Link href={"/new"} className="relative left-4 top-2 text-gray-200">don&apos;t have one? generate now!</Link>
      </div>
    </div>
  );
}