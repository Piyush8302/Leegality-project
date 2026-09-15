import { useEffect, useMemo, useState } from "react";
import Header from "../components/header/Header";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/pagination/Pagination";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import { useProductFilters } from "../hooks/useProductFilters";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import { filterProducts, getUniqueBrands } from "../utils/filterProducts";
import { paginate } from "../utils/paginate";
import { MOBILE_QUERY, OPEN_FILTERS_KEY } from "../utils/constants";
import styles from "./ProductListingPage.module.css";

function ProductListingPage() {
  // desktop: open by default, mobile: closed by default
  // on mobile open it if user came from the menu button on detail page
  const [sidebarToggled, setSidebarToggled] = useState(
    () =>
      sessionStorage.getItem(OPEN_FILTERS_KEY) === "true" &&
      window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    sessionStorage.removeItem(OPEN_FILTERS_KEY);
  }, []);

  const {
    filters,
    hasActiveFilters,
    setCategory,
    toggleBrand,
    setPriceRange,
    setPage,
    clearFilters,
  } = useProductFilters();

  const categories = useCategories();
  const { products, loading, error, retry } = useProducts(filters.category);

  const brands = useMemo(() => getUniqueBrands(products), [products]);
  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );
  const page = paginate(filteredProducts, filters.page);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderProducts() {
    if (loading) {
      return <Loader text="Loading products..." />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={retry} />;
    }

    if (filteredProducts.length === 0) {
      return (
        <EmptyState
          message="Try changing or clearing your filters."
          actionText={hasActiveFilters ? "Clear all filters" : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      );
    }

    return (
      <>
        <ProductGrid products={page.items} />
        <Pagination
          currentPage={page.currentPage}
          totalPages={page.totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  }

  return (
    <>
      <Header onMenuClick={() => setSidebarToggled((toggled) => !toggled)} />

      <main className={styles.page}>
        <div className={`${styles.layout} ${sidebarToggled ? styles.sidebarHidden : ""}`}>
          <aside className={styles.sidebar}>
            <FilterSidebar
              filters={filters}
              categories={categories.categories}
              categoriesLoading={categories.loading}
              categoriesError={categories.error}
              brands={brands}
              onCategoryChange={setCategory}
              onPriceApply={setPriceRange}
              onBrandToggle={toggleBrand}
            />
          </aside>

          <section className={styles.content}>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                Filters
              </h2>

              {hasActiveFilters && (
                <button type="button" className={styles.clearButton} onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>

            {renderProducts()}
          </section>
        </div>
      </main>
    </>
  );
}

export default ProductListingPage;
