import { useEffect, useRef } from "react";
import Version from "./Version";

export default function PanelAggregator() {
  const timeRef = useRef(null);
  const dateRef = useRef(null); // Because I'm up so late I'd figure it should refresh T_T

  useEffect(() => {
    function setTime() {
      if (!timeRef.current || !dateRef.current) return

      const now = new Date();

      timeRef.current.innerText = now.toLocaleTimeString(undefined);
      dateRef.current.innerText = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    setTime();

    const intervalId = setInterval(setTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <>
    <p>RPTS <Version /></p>
    <div className="flex-1 p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl" ref={dateRef}></h3>
          <h1 className="text-5xl" ref={timeRef}></h1>
        </div>
        <div className="text-right">
          <h3 className="text-xl">Parts left</h3>
          <h1 className="text-5xl">12</h1>
        </div>
      </div>
    </div>
  </>
}