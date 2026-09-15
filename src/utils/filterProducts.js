/**
 * Products me se unique brands nikalo (sidebar ke Brands filter ke liye).
 * - Jin products me brand nahi hai (jaise groceries), unhe skip karo
 * - A → Z sorted
 */
export function getUniqueBrands(products) {
  const brands = new Set();

  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });

  return [...brands].sort((a, b) => a.localeCompare(b));
}

// Value di gayi hai ya nahi (0 bhi valid value hai)
function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

/**
 * Brand + price + search filters ek saath lagao (combined filtering).
 * Product tabhi dikhega jab saari conditions match karein.
 */
export function filterProducts(
  products,
  { brands = [], minPrice = null, maxPrice = null, search = "" } = {}
) {
  const searchText = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesBrand =
      brands.length === 0 || brands.includes(product.brand);

    const matchesMinPrice =
      !hasValue(minPrice) || product.price >= Number(minPrice);

    const matchesMaxPrice =
      !hasValue(maxPrice) || product.price <= Number(maxPrice);

    const matchesSearch =
      searchText === "" || product.title.toLowerCase().includes(searchText);

    return matchesBrand && matchesMinPrice && matchesMaxPrice && matchesSearch;
  });
}