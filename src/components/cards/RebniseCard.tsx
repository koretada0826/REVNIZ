import Link from "next/link";
import styles from "./RebniseCard.module.css";

interface RebniseCardProps {
  href: string;
  image?: string;
  /** Fallback content when no image (e.g. large initial letter) */
  imageFallback?: React.ReactNode;
  /** Logo image to overlay on the card image */
  logo?: string;
  title: string;
  date: string;
  categories?: { label: string; color: string; isNew?: boolean }[];
}

export default function RebniseCard({
  href,
  image,
  imageFallback,
  logo,
  title,
  date,
  categories = [],
}: RebniseCardProps) {
  return (
    <div className={styles.listCard}>
      <Link href={href}>
        {/* Category Label */}
        {categories.length > 0 && (
          <div className={styles.categoryLabel}>
            <div style={{ display: "flex", gap: 0 }}>
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className={cat.isNew ? styles.catNew : undefined}
                  style={{
                    ...(cat.isNew ? {} : { backgroundColor: cat.color }),
                    padding: "4px 10px",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Image */}
        <div className={`${styles.image} ${styles.isSlice}`}>
          <div className={styles.imageInner}>
            <div
              className={styles.imageBg}
              style={
                image
                  ? { backgroundImage: `url(${image})` }
                  : { background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }
              }
            >
              {!image && imageFallback}
              {logo && (
                <img
                  src={logo}
                  alt={`${title} ロゴ`}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    height: '36px',
                    width: 'auto',
                    maxWidth: '120px',
                    objectFit: 'contain',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '4px',
                    padding: '4px 8px',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className={styles.detail}>
          <p className={styles.title} style={!date ? { fontSize: "16px", fontWeight: 800, height: "auto", marginBottom: 0 } : undefined}>{title}</p>
          {date && <p className={styles.update}>{date}</p>}
        </div>
      </Link>

      {/* SNS */}
      <div className={styles.sns}>
        <span>𝕏</span>
        <span>f</span>
      </div>
    </div>
  );
}
