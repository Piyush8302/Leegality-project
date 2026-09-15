import Rating from "../common/Rating";
import styles from "./ReviewList.module.css";

function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, index) => (
        // reviews have no id in the API, name + date + index keeps the key unique
        <li key={`${review.reviewerName}-${review.date}-${index}`} className={styles.review}>
          <div className={styles.reviewHeader}>
            <span className={styles.name}>{review.reviewerName}</span>
            <Rating value={review.rating} />
            {review.date && (
              <span className={styles.date}>
                {new Date(review.date).toLocaleDateString()}
              </span>
            )}
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
