"use client";

/**
 * スポンサーロゴ — 2段の横スクロール（逆方向）
 */

const logoUrls: Record<string, string> = {
  "wiz.png": "https://012grp.co.jp/",
  "nishi-shuzo.png": "https://www.nishi-shuzo.co.jp/",
  "kagoshima-toyota.png": "https://www.k-toyota.co.jp/",
  "y-and-m.png": "https://cp.you-me.co.jp/",
  "maya-group.png": "https://shop.mayass.com/",
  "kakuida.png": "https://www.kakuida.com/",
  "kagoshima-bank.png": "https://www.kagin.co.jp/",
  "itoen.png": "https://www.itoen.co.jp/",
  "iwasaki-group.png": "https://www.iwasaki-group.com/",
  "nangoku.png": "https://www.nangoku.co.jp/",
  "toyota.png": "https://corolla-kagoshima.info/",
  "BIGLOBE.png": "https://www.biglobe.co.jp/",
  "pref-kagoshima.png": "https://www.pref-kagoshima.jp/",
  "kyt.png": "https://www.kyt-tv.com/",
  "digital-gift.png": "https://digital-gift.jp/",
  "horiguchi-tea-farm.png": "https://www.horiguchiseicha.com/",
  "media-service.png": "https://mediaservice.co.jp/",
  "remixpoint.png": "https://denki.remixpoint.co.jp/",
  "t-next.png": "https://tnext.jp/",
  "tmtaiyo.png": "https://www.tmtaiyo.co.jp/",
  "vayorela.png": "https://vayorela.jp/",
  "zeus-wifi.png": "https://zeus-wifi.jp/",
};

const row1 = [
  "wiz.png", "nishi-shuzo.png", "kagoshima-toyota.png", "y-and-m.png",
  "maya-group.png", "kakuida.png", "kagoshima-bank.png", "itoen.png",
  "iwasaki-group.png", "nangoku.png", "toyota.png",
];

const row2 = [
  "BIGLOBE.png", "pref-kagoshima.png", "kyt.png", "digital-gift.png",
  "horiguchi-tea-farm.png", "media-service.png", "remixpoint.png",
  "t-next.png", "tmtaiyo.png", "vayorela.png", "zeus-wifi.png",
];

function LogoRow({ logos, direction, speed }: { logos: string[]; direction: "left" | "right"; speed: number }) {
  // 3倍複製でシームレスループ
  const items = [...logos, ...logos, ...logos];
  const totalWidth = logos.length * 176; // 160px + 16px gap

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
          width: `${totalWidth * 3}px`,
        }}
      >
        {items.map((logo, i) => (
          <a
            key={`${logo}-${i}`}
            href={logoUrls[logo] || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-[160px] h-[64px] rounded-lg bg-white flex items-center justify-center px-4 hover:scale-105 transition-transform"
          >
            <img
              src={`/images/sponsors/${logo}`}
              alt={logo.replace(".png", "")}
              className="max-w-full max-h-[48px] object-contain"
            />
          </a>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-${totalWidth}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function SponsorOrbit() {
  return (
    <div className="w-full space-y-4 -mx-4 sm:-mx-6 lg:-mx-8">
      <LogoRow logos={row1} direction="left" speed={40} />
      <LogoRow logos={row2} direction="right" speed={45} />
    </div>
  );
}
