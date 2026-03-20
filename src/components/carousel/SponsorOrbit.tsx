"use client";

/**
 * スポンサーロゴ配列 — 追加・削除はここだけ触ればOK
 * ファイルは public/images/sponsors/ に配置
 */
const sponsors = [
  "wiz.png",
  "nishi-shuzo.png",
  "kagoshima-toyota.png",
  "y-and-m.png",
  "maya-group.png",
  "kakuida.png",
  "kagoshima-bank.png",
  "itoen.png",
  "iwasaki-group.png",
  "toyota.png",
  "nangoku.png",
  "BIGLOBE.png",
];

const DURATION = 30; // 1周の秒数
const COUNT = sponsors.length;

export default function SponsorOrbit() {
  return (
    <div className="relative w-full" style={{ maxWidth: "800px", aspectRatio: "800/340" }}>
      <svg
        viewBox="0 0 800 340"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="plateShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.06" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path
            id="orbitPath"
            d="M 720,170 A 320,70 0 0,1 80,170 A 320,70 0 0,1 720,170 Z"
            fill="none"
          />
        </defs>

        {/* 白い楕円プレート */}
        <ellipse
          cx="400" cy="170" rx="320" ry="70"
          fill="none" stroke="#FFFFFF" strokeWidth="64"
          filter="url(#plateShadow)"
        />
        <ellipse
          cx="400" cy="170" rx="352" ry="102"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1"
        />
        <ellipse
          cx="400" cy="170" rx="288" ry="38"
          fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"
        />

        {/* ロゴ群 */}
        {sponsors.map((logo, i) => {
          const beginOffset = -((DURATION / COUNT) * i);
          const beginStr = `${beginOffset}s`;
          return (
            <g key={logo}>
              <animateMotion
                dur={`${DURATION}s`}
                repeatCount="indefinite"
                begin={beginStr}
              >
                <mpath href="#orbitPath" />
              </animateMotion>
              <g>
                <animate
                  attributeName="opacity"
                  dur={`${DURATION}s`}
                  repeatCount="indefinite"
                  values="0.6;1;0.6;0.3;0.6"
                  keyTimes="0;0.25;0.5;0.75;1"
                  begin={beginStr}
                />
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  dur={`${DURATION}s`}
                  repeatCount="indefinite"
                  values="0.85;1.1;0.85;0.7;0.85"
                  keyTimes="0;0.25;0.5;0.75;1"
                  begin={beginStr}
                />
                <image
                  href={`/images/sponsors/${logo}`}
                  x="-45"
                  y="-20"
                  width="90"
                  height="40"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
