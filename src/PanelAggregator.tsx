import { useEffect, useRef } from "react";
import Version from "./Version";
import LivePanel from "./panel/LivePanel";

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

  return (
    <div className="flex-1 px-5 pb-5">
      <div className="flex justify-even">
        <div className="flex-1 pt-5">
          <h3 className="text-xl" ref={dateRef}></h3>
          <h1 className="text-5xl" ref={timeRef}></h1>
        </div>
        <small className="flex-1 text-center text-gray-500 pt-1">RPTS <Version /></small>
        <div className="flex-1 text-right pt-5">
          <h3 className="text-xl">Parts left</h3>
          <h1 className="text-5xl">12</h1>
        </div>
      </div>
      <div className="py-5">
        <LivePanel />
      </div>
    </div>
  )
}