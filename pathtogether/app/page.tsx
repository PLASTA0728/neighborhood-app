'use client';

import { useEffect, useRef } from "react";
// import { Button }from "@/app/ui/button";
import  "@/app/ui/start/page.css";
import { jost } from "./ui/fonts";
import Link from "next/link";
// import { usePathname } from "next/navigation";

function App() {
  const appRef = useRef(null);
  // const toRef = useRef(null);

  useEffect(() => {
    const moveGradient = (event) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const mouseX = Math.round(event.pageX / winWidth * 100);
      const mouseY = Math.round(event.pageY / winHeight * 100);

      if (appRef) {
        appRef.current.style.setProperty("--mouse-x", `${mouseX}%`);
        appRef.current.style.setProperty("--mouse-y", `${mouseY}%`);
      }
    }
    document.addEventListener("mousemove", moveGradient);

    return function cleanup() {
      document.removeEventListener("mousemove", moveGradient);
    };
}, [appRef]);

return (
  <div className="static">
    <div className="absolute -z-10 w-full h-full" id="app" ref={appRef} data-scroll-container></div>
    <div className="absolute bg-black z-0 w-full h-full opacity-65"></div>
    <div className={`${jost.className} z-20 absolute top-1/2 left-1/7`}>
      <div className="text-6xl font-normal">PathTogether</div>
      <div className="text-3xl font-extralight">one map, every destination</div>
    </div>
    <div className="absolute top-1/2 left-3/5">
    <div className="flex">
      <input className="z-20 placeholder:text-gray-500 bg-black px-4 py-4 w-75 relative left-0 rounded-md" placeholder="enter your session code" type="string" name="enter-session-code" />
      <Link href={"/edit-session"}>
      <svg xmlns="http://www.w3.org/2000/svg" className="z-40 relative right-10 top-4 fill-none stroke-white stroke-2 size-6"><path strokeLinecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" /></svg>
      </Link>
    </div>
    <Link href={"/new-session"} className="relative left-4 top-2">don&apos;t have one? generate now!</Link>
    </div>
  {/* <iframe src="https://snazzymaps.com/embed/708506" className="absolute w-full h-full z-10 opacity-20"></iframe> */}
</div>
);
}

export default App;