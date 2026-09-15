import styles from "./Common.module.css";

function Rating({ value = 0 }) {
  const rating = Math.min(Math.max(Number(value) || 0, 0), 5);
  const fillPercent = (rating / 5) * 100;

  return (
    <span className={styles.rating} aria-label={`Rated ${rating} out of 5`}>
      <span className={styles.stars} aria-hidden="true">
        <span className={styles.starsEmpty}>★★★★★</span>
        <span className={styles.starsFilled} style={{ width: `${fillPercent}%` }}>
          ★★★★★
        </span>
      </span>
      <span className={styles.ratingValue}>({rating.toFixed(1)})</span>
    </span>
  );
}

export default Rating;
