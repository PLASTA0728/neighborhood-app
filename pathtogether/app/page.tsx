'use client';

import { useEffect, useRef } from "react";

import  "@/app/ui/start/page.css";

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
  <div className="container">
    <iframe src="https://snazzymaps.com/embed/708506" ></iframe>
    <div className="black-filter" id="black-filter">
      <div className="app" id="app" ref={appRef} data-scroll-container>
        <div className="blink justify-center flex align center">
          Homepage
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;