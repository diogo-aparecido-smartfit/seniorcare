"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  PropsWithChildren,
} from "react";
import Lenis from "@studio-freight/lenis";

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const LenisProvider = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      smoothWheel: true,
    });
    const lenis = lenisRef.current;

    const animate = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenis = (): Lenis | null => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context.lenis;
};
