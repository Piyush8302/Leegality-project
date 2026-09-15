import { Link } from "react-router-dom";
import Rating from "../common/Rating";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>${product.price}</span>
          <Rating value={product.rating} />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
