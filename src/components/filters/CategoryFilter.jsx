import styles from "./Filters.module.css";

function CategoryFilter({ categories, loading, error, selected, onSelect, search = "" }) {
  const visibleCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Categories</h3>

      {loading && <p className={styles.hint}>Loading categories...</p>}
      {error && <p className={styles.errorText}>Could not load categories</p>}

      {!loading && !error && visibleCategories.length === 0 && (
        <p className={styles.hint}>No matching categories</p>
      )}

      {!loading && !error && (
        <ul className={styles.list}>
          {visibleCategories.map((category) => {
            const isSelected = selected === category.slug;

            return (
              <li key={category.slug}>
                <label className={styles.option}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    // only one category at a time, click again to unselect
                    onChange={() => onSelect(isSelected ? "" : category.slug)}
                  />
                  <span>{category.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default CategoryFilter;
