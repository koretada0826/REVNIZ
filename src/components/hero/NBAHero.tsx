"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import styles from "./NBAHero.module.css";

interface SlideData {
  category: string;
  headline: string;
  description: string;
  cta: { label: string; href: string };
  image: string;
  relatedContent: { text: string; href: string }[];
}

const slides: SlideData[] = [
  {
    category: "新着企業",
    headline: "薩摩デジタルマーケティングが新たにスポンサー参加",
    description:
      "デジタルマーケティングに強みを持つ薩摩デジタルマーケティングが加わりました。SNS運用、広告運用の実績多数。",
    cta: { label: "詳細を見る", href: "/companies" },
    image: "/images/hero-new-company.jpg",
    relatedContent: [
      { text: "スポンサー企業一覧を見る", href: "/companies" },
      { text: "企業間コラボの成功事例", href: "/cases" },
      { text: "第3回スポンサー交流会 — 3月28日開催", href: "/events" },
    ],
  },
  {
    category: "イベント",
    headline: "第3回スポンサー交流会の参加受付を開始",
    description:
      "3月28日開催。今回のテーマは「東京×鹿児島の連携」。スポンサー企業同士の名刺交換・情報交換の場。",
    cta: { label: "申込む", href: "/events" },
    image: "/images/hero-event.jpg",
    relatedContent: [
      { text: "ビジネスマッチング商談会 4月15日開催", href: "/events" },
      { text: "ホーム戦観戦交流会 — 残りわずか", href: "/events" },
      { text: "過去の交流会レポート", href: "/news" },
    ],
  },
  {
    category: "成功事例",
    headline: "鹿児島の食品が東京のセレクトショップへ展開決定",
    description:
      "桜島フーズとTokyo Creative Labの協業事例。パッケージデザインリニューアルにより東京3店舗への納品が決定。",
    cta: { label: "READ", href: "/cases" },
    image: "/images/hero-success.jpg",
    relatedContent: [
      { text: "建設会社のDX推進プロジェクトが始動", href: "/cases" },
      { text: "スポンサー同士の信頼が生む協業とは", href: "/cases" },
      { text: "2026年のマッチング実績を公開", href: "/news" },
    ],
  },
  {
    category: "相談",
    headline: "東京での販路拡大パートナーを募集中",
    description:
      "鹿児島県産食品の東京進出を検討中。卸先の開拓やポップアップ出店のノウハウがある企業と組みたい。",
    cta: { label: "READ", href: "/board" },
    image: "/images/hero-consultation.jpg",
    relatedContent: [
      { text: "採用サイトのリニューアルを検討中", href: "/board" },
      { text: "DX導入の壁打ち相手がほしい", href: "/board" },
      { text: "会場でのコラボイベントを企画したい", href: "/board" },
    ],
  },
  {
    category: "商談会",
    headline: "ビジネスマッチング商談会 4月15日開催",
    description:
      "1社15分の短時間商談形式。事前にマッチングリストを共有し、効率的な商談を実現します。",
    cta: { label: "申込む", href: "/events" },
    image: "/images/hero-meeting.jpg",
    relatedContent: [
      { text: "ホーム戦観戦交流会のご案内", href: "/events" },
      { text: "マッチングおすすめを更新しました", href: "/news" },
      { text: "スポンサー交流会の参加受付中", href: "/events" },
    ],
  },
];

const SLIDE_DURATION = 7000;

export default function NBAHero() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goToSlide((current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goToSlide]);

  return (
    <div className={styles.hero}>
      <div className={`${styles.heroLayer} ${styles.heroMargin}`}>
        {/* Background Images */}
        {slides.map((slide, i) => (
          <img
            key={`${i}-${animKey}`}
            src={slide.image}
            alt={slide.headline}
            className={styles.background}
            data-is-visible={i === current ? "true" : "false"}
          />
        ))}

        {/* Shadow/Gradient Overlay */}
        <div className={styles.heroShadow} />

        {/* Content Layers */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.contentLayer}
            style={{
              zIndex: i === current ? 20 : 10,
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <div>
              <Link href={slide.cta.href}>
                <h2 className={styles.headline}>{slide.headline}</h2>
              </Link>

              <p className={styles.description}>{slide.description}</p>

              <div className={styles.buttonsWrap}>
                <Link href={slide.cta.href} className={styles.ctaButton}>
                  {slide.cta.label}
                </Link>
              </div>

              <div className={styles.relatedContent}>
                <h4 className={styles.relatedTitle}>Related Content</h4>
                <ul>
                  {slide.relatedContent.map((rc, j) => (
                    <li key={j} className={styles.relatedItem}>
                      <Link href={rc.href} className={styles.relatedLink}>
                        {rc.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Controls Layer - Bottom indicator bar */}
        <div className={styles.controlsLayer}>
          <div className={styles.controlsInner}>
            {slides.map((slide, i) => {
              const isCurrent = i === current;
              const isPast =
                i < current || (current === 0 && i === slides.length - 1 && animKey > 0)
                  ? false
                  : false;

              return (
                <button
                  key={i}
                  className={styles.controlButton}
                  onClick={() => goToSlide(i)}
                  title={slide.headline}
                  type="button"
                >
                  {/* Progress Bar */}
                  <div className={styles.controlBar}>
                    <div
                      key={`track-${i}-${animKey}`}
                      className={styles.controlTrack}
                      data-track-in={isCurrent ? "true" : "false"}
                      data-track-full="false"
                    />
                  </div>

                  {/* Category Title */}
                  <div className={styles.controlTitle}>
                    <p
                      className={styles.controlHeroText}
                      data-is-current={isCurrent ? "true" : "false"}
                    >
                      {slide.category}
                    </p>
                  </div>

                  {/* Slide Headline */}
                  <p
                    className={styles.controlText}
                    data-is-current={isCurrent ? "true" : "false"}
                  >
                    {slide.headline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
