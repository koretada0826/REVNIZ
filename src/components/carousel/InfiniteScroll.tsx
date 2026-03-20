"use client";

import { useEffect, useRef, useState } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode[];
  interval?: number; // ms between scrolls
  cardWidth?: number; // px width of each card + gap
}

export default function InfiniteScroll({
  children,
  interval = 2500,
  cardWidth = 332, // 316px card + 16px gap
}: InfiniteScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const itemCount = children.length;

  // Duplicate items 3x for seamless loop
  const items = [...children, ...children, ...children];

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  // When we've scrolled past the first set, reset seamlessly
  useEffect(() => {
    if (offset >= itemCount) {
      // Wait for transition to finish, then snap back
      const timeout = setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          setOffset(0);
          // Force reflow then re-enable transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (trackRef.current) {
                trackRef.current.style.transition =
                  "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
              }
            });
          });
        }
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [offset, itemCount]);

  const translateX = -(offset * cardWidth);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-4"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
          willChange: "transform",
        }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: `${cardWidth - 16}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
