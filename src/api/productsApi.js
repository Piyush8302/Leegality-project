const BASE_URL = "https://dummyjson.com";

// Listing page ke liye sirf zaroori fields (response chhota aur fast)
// id apne aap aata hai, card click pe detail page kholne ke kaam aayega
const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

/**
 * Common fetch helper.
 * - Error handling ek hi jagah
 * - signal: AbortController se purani request cancel karne ke liye
 */
async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    const message =
      response.status === 404
        ? "Not found"
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

// Saare products (limit=0 → saare products ek saath)
export function getAllProducts(signal) {
  return request(`/products?limit=0&select=${LIST_FIELDS}`, signal);
}

// Ek category ke saare products
export function getProductsByCategory(slug, signal) {
  return request(
    `/products/category/${encodeURIComponent(slug)}?limit=0&select=${LIST_FIELDS}`,
    signal
  );
}

// Saari categories → [{ slug, name, url }, ...]
export function getCategories(signal) {
  return request("/products/categories", signal);
}

// Ek product ki poori detail (description, brand, category, reviews sab)
export function getProductById(id, signal) {
  return request(`/products/${encodeURIComponent(id)}`, signal);
}