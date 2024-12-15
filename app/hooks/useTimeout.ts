"use client";

import { useState, useEffect } from "react";
import { TIMEOUT_DURATION } from "../constants";

export function useTimeout(hasSelectedSeats: boolean, lastActionTime: number) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasSelectedSeats && Date.now() - lastActionTime > TIMEOUT_DURATION) {
        setShowWarning(true);
      }
    }, TIMEOUT_DURATION);

    return () => clearTimeout(timeoutId);
  }, [lastActionTime, hasSelectedSeats]);

  return {
    showWarning,
    setShowWarning
  };
}