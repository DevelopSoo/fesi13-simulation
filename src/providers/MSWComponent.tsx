// src/providers/MSWComponent.tsx

"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/mocks";

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(
    process.env.NODE_ENV !== "development",
  );
  useEffect(() => {
    const init = async () => {
      await initMocks();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }
  return <>{children}</>;
};
