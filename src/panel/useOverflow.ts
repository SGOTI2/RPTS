import { useLayoutEffect, useRef, useState } from "react";

export default function useOverflow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [overflowingAmount, setOverflowingAmount] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const check = () => {
      const el = ref.current!;
      setOverflowingAmount(el.scrollWidth - el.clientWidth);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(ref.current);

    return () => ro.disconnect();
  }, [ref.current?.textContent]);

  return { ref, overflowing: overflowingAmount > 0, overflowingAmount };
}