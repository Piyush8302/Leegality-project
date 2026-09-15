import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Header.module.css";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isListingPage = location.pathname === "/";
  const currentSearch = isListingPage ? searchParams.get("q") || "" : "";

  function handleSubmit(event) {
    event.preventDefault();
    const text = event.target.elements.search.value.trim();

    // keep the current filters when searching from the listing page
    const params = isListingPage ? new URLSearchParams(searchParams) : new URLSearchParams();

    if (text) {
      params.set("q", text);
    } else {
      params.delete("q");
    }
    params.delete("page");

    navigate({ pathname: "/", search: params.toString() });
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {onMenuClick && (
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={onMenuClick}
            aria-label="Toggle filters"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        )}

        <Link to="/" className={styles.logo}>
          ShopEasy
        </Link>

        <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            key={currentSearch}
            name="search"
            type="search"
            className={styles.searchInput}
            placeholder="Search products..."
            defaultValue={currentSearch}
            aria-label="Search products"
          />
        </form>

        <div className={styles.actions}>
          <span className={styles.iconButton} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2.5 11h11L21 8H6.5" />
            </svg>
          </span>
          <span className={styles.iconButton} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
