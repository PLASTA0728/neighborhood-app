'use client';

import { useEffect, useRef } from "react";
import { Button }from "@/app/ui/button";
import  "@/app/ui/start/page.css";
import { jost } from "./ui/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

function App() {
  const appRef = useRef(null);
  const toRef = useRef(null);

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
    <div className="black-filter" id="black-filter">
      <div className="app" id="app" ref={appRef} data-scroll-container>
        {/* <div className="blink justify-center flex align center">
          Homepage
        </div> */}
      </div>
    </div>
    <div className={`${jost.className} z-10 absolute top-1/2 left-1/7`}>
      <div className="text-6xl font-normal">PathTogether</div>
      <div className="text-3xl font-extralight">one map, every destination</div>
    </div>
    <div className="absolute top-1/2 right-1/5">
      <input className="flex placeholder:text-gray-500 bg-black px-4 py-4 w-75 relative left-0 rounded-md" placeholder="enter your session code" type="string" name="enter-session-code" />
      <Link href={"/new-session"} className="relative left-4 top-2">don't have one? generate now!</Link>
    </div>
  {/* <iframe src="https://snazzymaps.com/embed/708506" ></iframe> */}
</div>
);
}

export default App;