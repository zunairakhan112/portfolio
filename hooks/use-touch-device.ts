import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const touchPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints >= 1 : false;
    return coarsePointer || touchPoints;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateTouchState = () => {
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const hasTouchPoints =
        typeof navigator !== "undefined" ? navigator.maxTouchPoints >= 1 : false;
      setIsTouchDevice(hasCoarsePointer || hasTouchPoints);
    };

    updateTouchState();

    window.addEventListener("resize", updateTouchState);

    return () => {
      window.removeEventListener("resize", updateTouchState);
    };
  }, []);

  return isTouchDevice;
}


