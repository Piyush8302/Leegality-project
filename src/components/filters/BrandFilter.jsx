import styles from "./Filters.module.css";

function BrandFilter({ brands, selected, onToggle, search = "" }) {
  const visibleBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>
        Brands {selected.length > 0 && `(${selected.length})`}
      </h3>

      {brands.length === 0 && <p className={styles.hint}>No brands available</p>}

      {brands.length > 0 && visibleBrands.length === 0 && (
        <p className={styles.hint}>No matching brands</p>
      )}

      <ul className={styles.list}>
        {visibleBrands.map((brand) => (
          <li key={brand}>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={selected.includes(brand)}
                onChange={() => onToggle(brand)}
              />
              <span>{brand}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BrandFilter;
