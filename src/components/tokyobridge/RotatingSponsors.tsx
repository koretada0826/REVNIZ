"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SPONSORS = [
  { id: "co-1", name: "テクノバレー", initial: "TV" },
  { id: "co-2", name: "NextStep", initial: "NS" },
  { id: "co-3", name: "CRAFT PR", initial: "CP" },
  { id: "co-5", name: "LocalX Labs", initial: "LX" },
  { id: "co-6", name: "Bridge Com", initial: "BC" },
  { id: "th-1", name: "鹿児島建設", initial: "KC" },
  { id: "th-2", name: "南薩フーズ", initial: "SF" },
  { id: "th-3", name: "霧島テック", initial: "KT" },
  { id: "th-5", name: "薩摩サービス", initial: "SS" },
  { id: "th-4", name: "桜島リゾーツ", initial: "SR" },
  { id: "revniz", name: "REVNIZ", initial: "RZ" },
  { id: "spark", name: "Spark Dig", initial: "SD" },
];

export const RotatingSponsors = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let frameId: number;
    const animate = (time: number) => {
      if (!isPaused) {
        if (lastTime.current !== null) {
          const delta = time - lastTime.current;
          // Subtracted delta to make it rotate clockwise
          setAngle((prev) => (prev - delta * 0.02) % 360);
        }
        lastTime.current = time;
      } else {
        lastTime.current = null;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  // Ring dimensions
  const [dimensions, setDimensions] = useState({ radiusX: 340, radiusY: 50 });

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ radiusX: 160, radiusY: 35 });
      } else if (w < 1024) {
        setDimensions({ radiusX: 260, radiusY: 45 });
      } else {
        setDimensions({ radiusX: 340, radiusY: 50 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  if (!mounted) return <div className="h-[280px] sm:h-[340px]" />;

  const { radiusX, radiusY } = dimensions;

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center overflow-hidden bg-transparent select-none py-10">
      {/* Background Continuous OVAL Plate */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[100%] pointer-events-none"
        style={{
          width: radiusX * 2 + 64,
          height: radiusY * 2 + 64,
          borderWidth: 64,
          borderStyle: "solid",
          borderColor: "#ffffff",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08), inset 0 2px 10px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 1px rgba(0,0,0,0.02)",
          boxSizing: "border-box",
          zIndex: 5
        }}
      />
      
      {/* Logos Container */}
      <div 
        className="relative w-full max-w-[900px] h-full flex items-center justify-center z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {SPONSORS.map((sponsor, index) => {
          const itemAngle = (angle + (index * 360) / SPONSORS.length) * (Math.PI / 180);
          
          // Calculate 3D position
          const x = Math.sin(itemAngle) * radiusX;
          const z = Math.cos(itemAngle); // -1 (back) to 1 (front)
          const y = z * radiusY; // Tilted ellipse effect
          
          // Scale and opacity based on depth (z)
          const scale = 0.75 + (z + 1) * 0.15; // 0.75 to 1.05
          const opacity = 0.3 + (z + 1) * 0.35; // 0.3 to 1.0
          const zIndex = Math.round((z + 1) * 100) + 10; // offset to stay above plate

          return (
            <Link 
              key={sponsor.id} 
              href={`/bridge/companies/${sponsor.id}`}
              className="absolute"
              style={{
                x,
                y,
                zIndex,
                scale,
                opacity: Math.max(0.3, Math.min(1.0, opacity)),
                cursor: "pointer",
              }}
            >
              <motion.div
                initial={false}
                whileHover={{ 
                  scale: 1.15, 
                  zIndex: 300, 
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                <div className="flex flex-col items-center justify-center group relative">
                  {/* Logo (No Card Background) */}
                  <span className="text-[20px] sm:text-[24px] font-bold text-black-900 group-hover:text-indigo-600 transition-colors drop-shadow-sm">
                    {sponsor.initial}
                  </span>
                  
                  {/* Name Tooltip */}
                  <div 
                    className="absolute top-full mt-2 px-2.5 py-1 bg-black-900/90 text-white text-[10px] sm:text-[11px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md whitespace-nowrap"
                  >
                    {sponsor.name}
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
