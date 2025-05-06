"use client";
import React, { PropsWithChildren } from "react";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

const LenisWrapper = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis();
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

  return <>{children}</>;
};

export default LenisWrapper;
