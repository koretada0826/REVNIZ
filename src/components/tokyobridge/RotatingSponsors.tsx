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
          setAngle((prev) => (prev + delta * 0.02) % 360);
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
      {/* Background Decorative Ring */}
      <div 
        className="absolute w-[90%] max-w-[700px] h-[100px] rounded-[100%] border border-black-100/30 pointer-events-none"
        style={{ transform: "translateY(10px)" }}
      />
      
      {/* Logos Container */}
      <div 
        className="relative w-full max-w-[900px] h-full flex items-center justify-center"
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
          const zIndex = Math.round((z + 1) * 100);

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
                  scale: 1.1, 
                  zIndex: 300, 
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              >
                <div className="flex flex-col items-center gap-2.5 group">
                  {/* Logo Card */}
                  <div className="w-[54px] h-[54px] sm:w-[64px] sm:h-[64px] rounded-[10px] bg-white border border-line-dark shadow-xs flex items-center justify-center group-hover:border-indigo-400 group-hover:shadow-card-hover transition-all duration-300">
                    <span className="text-[16px] sm:text-[18px] font-bold text-black-900 group-hover:text-indigo-600 tracking-tight">
                      {sponsor.initial}
                    </span>
                  </div>
                  
                  {/* Label (Optional: only visible when near front for clarity) */}
                  <div 
                    className="text-[9px] sm:text-[11px] font-bold text-black-400 whitespace-nowrap transition-colors duration-300 group-hover:text-indigo-500"
                    style={{ visibility: z > -0.5 ? "visible" : "hidden" }}
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
