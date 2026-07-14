import { useEffect, useRef } from "react";

export default function Time() {
  const timeRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLHeadingElement>(null); // Because I'm up so late I'd figure it should refresh T_T

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

  return (<>
    <h3 className="text-xl" ref={dateRef}></h3>
    <h1 className="text-5xl" ref={timeRef}></h1>
  </>)
}