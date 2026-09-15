import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Rating from "../components/common/Rating";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import ReviewList from "../components/product/ReviewList";
import { useProduct } from "../hooks/useProduct";
import styles from "./ProductDetailPage.module.css";

// "home-decoration" -> "Home Decoration"
function formatCategory(slug = "") {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, loading, error, retry } = useProduct(id);

  // reset picked image when the product changes
  const [picked, setPicked] = useState({ productId: null, image: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  function handleBack() {
    // opened directly, nothing to go back to
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  function renderContent() {
    if (loading) {
      return <Loader text="Loading product..." />;
    }

    if (error === "Not found") {
      return (
        <EmptyState
          title="Product not found"
          message="The product you are looking for does not exist."
          actionText="Back to products"
          onAction={() => navigate("/")}
        />
      );
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={retry} />;
    }

    if (!product) {
      return null;
    }

    const images = product.images?.length ? product.images : [product.thumbnail];
    const activeImage =
      picked.productId === product.id && picked.image ? picked.image : images[0];

    return (
      <div className={styles.layout}>
        <div>
          <img src={activeImage} alt={product.title} className={styles.mainImage} />

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`${styles.thumbnail} ${image === activeImage ? styles.thumbnailActive : ""}`}
                  onClick={() => setPicked({ productId: product.id, image })}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            <Rating value={product.rating} />
          </div>

          <p className={styles.meta}>
            <span className={styles.metaLabel}>Brand:</span> {product.brand || "N/A"}
          </p>
          <p className={styles.meta}>
            <span className={styles.metaLabel}>Category:</span> {formatCategory(product.category)}
          </p>

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>Description</h2>
          <p className={styles.description}>{product.description}</p>

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>Reviews</h2>
          <ReviewList reviews={product.reviews} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.card}>
          <button type="button" className="btn" onClick={handleBack}>
            ← Back
          </button>

          {renderContent()}
        </div>
      </main>
    </>
  );
}

export default ProductDetailPage;
