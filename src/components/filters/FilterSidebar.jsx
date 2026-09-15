import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import styles from "./Filters.module.css";

function FilterSidebar({
  filters,
  categories,
  categoriesLoading,
  categoriesError,
  brands,
  onCategoryChange,
  onPriceApply,
  onBrandToggle,
}) {
  // narrows down the category and brand lists, does not filter products
  const [search, setSearch] = useState("");

  return (
    <div>
      <label className={styles.searchBox}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search categories and brands"
        />
      </label>

      <CategoryFilter
        categories={categories}
        loading={categoriesLoading}
        error={categoriesError}
        selected={filters.category}
        onSelect={onCategoryChange}
        search={search}
      />

      <PriceFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onApply={onPriceApply}
      />

      <BrandFilter
        brands={brands}
        selected={filters.brands}
        onToggle={onBrandToggle}
        search={search}
      />
    </div>
  );
}

export default FilterSidebar;
