import { useEffect, useRef, useState } from "react";
import styles from "./Filters.module.css";

const AUTO_APPLY_DELAY = 600;

function getPriceError(min, max) {
  if (Number(min) < 0 || Number(max) < 0) {
    return "Price cannot be negative";
  }
  if (min !== "" && max !== "" && Number(min) > Number(max)) {
    return "Min price cannot be more than max price";
  }
  return "";
}

function PriceFilter({ minPrice, maxPrice, onApply }) {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);
  const [lastUrlValues, setLastUrlValues] = useState({ minPrice, maxPrice });

  const timerRef = useRef(null);
  const onApplyRef = useRef(onApply);

  // price was changed from outside (e.g. "Clear all"), show the new values in the inputs
  if (lastUrlValues.minPrice !== minPrice || lastUrlValues.maxPrice !== maxPrice) {
    setLastUrlValues({ minPrice, maxPrice });
    setMin(minPrice);
    setMax(maxPrice);
  }

  useEffect(() => {
    onApplyRef.current = onApply;
  }, [onApply]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const error = getPriceError(min, max);

  function apply(newMin, newMax) {
    clearTimeout(timerRef.current);
    if (!getPriceError(newMin, newMax)) {
      onApplyRef.current(newMin, newMax);
    }
  }

  // apply automatically once the user stops typing
  function applyLater(newMin, newMax) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => apply(newMin, newMax), AUTO_APPLY_DELAY);
  }

  function handleMinChange(event) {
    setMin(event.target.value);
    applyLater(event.target.value, max);
  }

  function handleMaxChange(event) {
    setMax(event.target.value);
    applyLater(min, event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    apply(min, max);
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Price Range</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles.priceRow}>
          <input
            type="number"
            min="0"
            className={styles.input}
            placeholder="Min"
            value={min}
            onChange={handleMinChange}
            aria-label="Minimum price"
          />
          <input
            type="number"
            min="0"
            className={styles.input}
            placeholder="Max"
            value={max}
            onChange={handleMaxChange}
            aria-label="Maximum price"
          />
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button
          type="submit"
          className={`btn btn-primary ${styles.applyButton}`}
          disabled={Boolean(error)}
        >
          Apply
        </button>
      </form>
    </section>
  );
}

export default PriceFilter;
