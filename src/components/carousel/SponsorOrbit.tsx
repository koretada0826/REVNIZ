"use client";

/**
 * 3層楕円オービット — スポンサーロゴが帯状リングを流れるUI
 * 外側ほどゆっくり・大きく、内側ほど速く・小さく
 * 中間リングは逆回転
 */

const outerLogos = [
  "wiz.png", "nishi-shuzo.png", "kagoshima-toyota.png", "y-and-m.png",
  "maya-group.png", "kakuida.png", "kagoshima-bank.png", "itoen.png",
  "iwasaki-group.png", "nangoku.png",
];

const middleLogos = [
  "toyota.png", "BIGLOBE.png", "pref-kagoshima.png", "kyt.png",
  "digital-gift.png", "horiguchi-tea-farm.png", "media-service.png",
];

const innerLogos = [
  "remixpoint.png", "t-next.png", "tmtaiyo.png", "vayorela.png", "zeus-wifi.png",
];

const CX = 450;
const CY = 250;

interface Layer {
  id: string;
  rx: number;
  ry: number;
  strokeW: number;
  dur: number;
  reverse: boolean;
  logos: string[];
  logoW: number;
  logoH: number;
}

const layers: Layer[] = [
  {
    id: "outer", rx: 400, ry: 130, strokeW: 50,
    dur: 52, reverse: false, logos: outerLogos, logoW: 170, logoH: 72,
  },
  {
    id: "middle", rx: 280, ry: 88, strokeW: 42,
    dur: 38, reverse: true, logos: middleLogos, logoW: 145, logoH: 62,
  },
  {
    id: "inner", rx: 168, ry: 52, strokeW: 36,
    dur: 26, reverse: false, logos: innerLogos, logoW: 120, logoH: 52,
  },
];

export default function SponsorOrbit() {
  return (
    <div className="relative w-full mx-auto overflow-hidden" style={{ maxWidth: "900px" }}>
      <svg
        viewBox="0 0 900 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Ring gradients (white) ── */}
          <linearGradient id="rgOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
          </linearGradient>
          <linearGradient id="rgMiddle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
          </linearGradient>
          <linearGradient id="rgInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
          </linearGradient>

          {/* ── Edge highlight (white, subtle) ── */}
          <linearGradient id="ehOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
          </linearGradient>
          <linearGradient id="ehMiddle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
          </linearGradient>
          <linearGradient id="ehInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
          </linearGradient>

          {/* ── Bottom edge (white, subtle) ── */}
          <linearGradient id="beOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
          </linearGradient>
          <linearGradient id="beMiddle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
          </linearGradient>
          <linearGradient id="beInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
          </linearGradient>

          {/* ── Drop shadow ── */}
          <filter id="ringShadow" x="-8%" y="-8%" width="116%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="12" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Orbit paths (clockwise) ── */}
          {layers.map((l) => (
            <path
              key={`p-${l.id}`}
              id={`orbit-${l.id}`}
              d={`M ${CX + l.rx},${CY} A ${l.rx},${l.ry} 0 0,1 ${CX - l.rx},${CY} A ${l.rx},${l.ry} 0 0,1 ${CX + l.rx},${CY}`}
              fill="none"
            />
          ))}
        </defs>

        {/* ═══════ Render outer → inner (back to front) ═══════ */}
        {layers.map((l) => {
          const count = l.logos.length;
          const gradId = l.id === "outer" ? "rgOuter" : l.id === "middle" ? "rgMiddle" : "rgInner";
          const ehId = l.id === "outer" ? "ehOuter" : l.id === "middle" ? "ehMiddle" : "ehInner";
          const beId = l.id === "outer" ? "beOuter" : l.id === "middle" ? "beMiddle" : "beInner";

          // Depth anim: clockwise → 25%=bottom(near)=bright, 75%=top(far)=dim
          // Reversed  → 25%=top(far)=dim,   75%=bottom(near)=bright
          const opVals = l.reverse
            ? "0.85;0.65;0.85;1;0.85"
            : "0.85;1;0.85;0.65;0.85";
          const scaleVals = l.reverse
            ? "0.9;0.75;0.9;1.1;0.9"
            : "0.9;1.1;0.9;0.75;0.9";

          return (
            <g key={l.id}>
              {/* ── Ring band ── */}
              <ellipse
                cx={CX} cy={CY} rx={l.rx} ry={l.ry}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={l.strokeW}
                filter="url(#ringShadow)"
              />

              {/* Outer edge highlight (top = bright, fading down) */}
              <ellipse
                cx={CX} cy={CY}
                rx={l.rx + l.strokeW / 2 - 0.5}
                ry={l.ry + l.strokeW / 2 - 0.5}
                fill="none"
                stroke={`url(#${ehId})`}
                strokeWidth="1.5"
              />

              {/* Inner edge (bottom glow) */}
              <ellipse
                cx={CX} cy={CY}
                rx={l.rx - l.strokeW / 2 + 0.5}
                ry={l.ry - l.strokeW / 2 + 0.5}
                fill="none"
                stroke={`url(#${beId})`}
                strokeWidth="1"
              />

              {/* ── Logos ── */}
              {l.logos.map((logo, i) => {
                const offset = -((l.dur / count) * i);
                const begin = `${offset}s`;
                return (
                  <g key={`${l.id}-${i}`}>
                    <animateMotion
                      dur={`${l.dur}s`}
                      repeatCount="indefinite"
                      begin={begin}
                      {...(l.reverse
                        ? { keyPoints: "1;0", keyTimes: "0;1", calcMode: "linear" as const }
                        : {})}
                    >
                      <mpath href={`#orbit-${l.id}`} />
                    </animateMotion>
                    <g>
                      <animate
                        attributeName="opacity"
                        dur={`${l.dur}s`}
                        repeatCount="indefinite"
                        values={opVals}
                        keyTimes="0;0.25;0.5;0.75;1"
                        begin={begin}
                      />
                      <animateTransform
                        attributeName="transform"
                        type="scale"
                        dur={`${l.dur}s`}
                        repeatCount="indefinite"
                        values={scaleVals}
                        keyTimes="0;0.25;0.5;0.75;1"
                        begin={begin}
                      />
                      <rect
                        x={-l.logoW / 2 - 4}
                        y={-l.logoH / 2 - 3}
                        width={l.logoW + 8}
                        height={l.logoH + 6}
                        rx={6}
                        fill="white"
                      />
                      <image
                        href={`/images/sponsors/${logo}`}
                        x={-l.logoW / 2}
                        y={-l.logoH / 2}
                        width={l.logoW}
                        height={l.logoH}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </g>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
