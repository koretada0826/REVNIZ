"use client";

import CountUp from "react-countup";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function AnimatedNumber({ value, suffix = "", duration = 1.2, className }: Props) {
  return (
    <CountUp end={value} duration={duration} suffix={suffix} enableScrollSpy scrollSpyOnce>
      {({ countUpRef }) => <span ref={countUpRef} className={className} />}
    </CountUp>
  );
}
