"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import styles from "./NBAHero.module.css";

interface SlideData {
  category: string;
  headline: string;
  headlineSp: string;
  description: string;
  cta: { label: string; href: string };
  image: string;
  relatedContent: { text: string; href: string }[];
}

const slides: SlideData[] = [
  {
    category: "試合",
    headline: '一つになって戦う — <span style="color:#C8102E">レブナイズの熱い試合</span>をスポンサー席で',
    headlineSp: '<span style="color:#C8102E">熱い試合</span>をスポンサー席で',
    description:
      "選手たちの円陣に宿るチームの絆。スポンサー企業の皆様の応援が、選手たちの力になっています。",
    cta: { label: "イベントを見る", href: "/events" },
    image: "/images/hero-1.jpg",
    relatedContent: [
      { text: "ホーム戦スケジュール", href: "/events" },
      { text: "スポンサー観戦特典を見る", href: "/benefits" },
      { text: "スポンサー企業一覧", href: "/companies" },
    ],
  },
  {
    category: "B2昇格",
    headline: '鹿児島レブナイズ <span style="color:#C8102E">B2昇格</span> — 新たなステージへ',
    headlineSp: 'レブナイズ<span style="color:#C8102E">B2昇格</span>',
    description:
      "スポンサー企業の皆様とともに掴んだB2昇格。さらなる高みを目指し、鹿児島のスポーツシーンを盛り上げます。",
    cta: { label: "スポンサー一覧を見る", href: "/companies" },
    image: "/images/hero-2.jpg",
    relatedContent: [
      { text: "35社のスポンサー企業一覧", href: "/companies" },
      { text: "企業間コラボの成功事例", href: "/cases" },
      { text: "シーズン報告会のご案内", href: "/events" },
    ],
  },
  {
    category: "交流会",
    headline: 'スポンサー企業同士がつながる<span style="color:#C8102E">Tip offパーティー</span>',
    headlineSp: '<span style="color:#C8102E">Tip off</span>パーティー',
    description:
      "シーズン開幕を祝うTip offパーティー。スポンサー企業の皆様が一堂に会し、新たなビジネスの出会いが生まれる特別な夜。",
    cta: { label: "イベントを見る", href: "/events" },
    image: "/images/hero-3.jpg",
    relatedContent: [
      { text: "次回交流会の参加受付中", href: "/events" },
      { text: "スポンサー特典を確認する", href: "/benefits" },
      { text: "相談掲示板で商談相手を探す", href: "/board" },
    ],
  },
  {
    category: "ビジネス",
    headline: '鹿児島から全国へ — スポンサー企業間の<span style="color:#C8102E">協業が加速</span>',
    headlineSp: '企業間<span style="color:#C8102E">協業</span>が加速',
    description:
      "レブナイズのスポンサーネットワークを通じて、異業種の企業同士が出会い、新たなビジネスチャンスを創出しています。",
    cta: { label: "成功事例を見る", href: "/cases" },
    image: "/images/hero-2.jpg",
    relatedContent: [
      { text: "企業間コラボの成功事例", href: "/cases" },
      { text: "ビジネスマッチング商談会", href: "/events" },
      { text: "2026年のマッチング実績を公開", href: "/news" },
    ],
  },
  {
    category: "スポンサー募集",
    headline: '<span style="color:#C8102E">レブナイズと一緒に</span>鹿児島を盛り上げませんか',
    headlineSp: '<span style="color:#C8102E">一緒に</span>盛り上げよう',
    description:
      "年間12万円から参加可能。チームロゴ使用権、試合会場看板、パートナー通信など充実の特典をご用意しています。",
    cta: { label: "スポンサー特典を見る", href: "/benefits" },
    image: "/images/hero-1.jpg",
    relatedContent: [
      { text: "スポンサー金額プランを確認", href: "/benefits" },
      { text: "35社のスポンサー企業一覧", href: "/companies" },
      { text: "お問い合わせ", href: "/profile" },
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
                <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: slide.headline }} />
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

                  {/* Slide Headline — desktop: full, mobile: short */}
                  <p
                    className={styles.controlText}
                    data-is-current={isCurrent ? "true" : "false"}
                    dangerouslySetInnerHTML={{ __html: slide.headline }}
                  />
                  <p
                    className={styles.controlTextSp}
                    data-is-current={isCurrent ? "true" : "false"}
                    dangerouslySetInnerHTML={{ __html: slide.headlineSp }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
