// unique brands sorted A-Z, products without a brand (e.g. groceries) are skipped
export function getUniqueBrands(products) {
  const brands = new Set();

  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });

  return [...brands].sort((a, b) => a.localeCompare(b));
}

// 0 is a valid price, so a plain falsy check is not enough
function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

// brand + price + search, a product is kept only if all of them match
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
