import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { OPEN_FILTERS_KEY } from "../../utils/constants";
import styles from "./Header.module.css";

const menuIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

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

  // on pages without a sidebar, the menu button takes the user back to the filters
  function openFilters() {
    sessionStorage.setItem(OPEN_FILTERS_KEY, "true");

    // going back keeps the filters the user had, a directly opened page has no history
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onMenuClick || openFilters}
            aria-label={onMenuClick ? "Toggle filters" : "Show filters"}
          >
            {menuIcon}
          </button>
        </div>

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

        <div className={styles.actions} aria-hidden="true">
          <span className={styles.icon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 4H2V2h4.6l.9 2H22l-3.4 8.5a2 2 0 0 1-1.9 1.3H8.1l-.9 1.7h12.3v2H4.1l2.4-4.6L5.2 4Z" />
            </svg>
          </span>
          <span className={styles.icon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 14a8 8 0 0 1-6.2-3c.9-1.8 3.4-3 6.2-3s5.3 1.2 6.2 3a8 8 0 0 1-6.2 3Z" />
            </svg>
          </span>
          <span className={styles.icon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5Z" />
            </svg>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
