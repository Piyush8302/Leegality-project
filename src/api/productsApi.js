// fallback in case env is missing
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

// only the fields needed for the cards
const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  // fetch doesn't throw on 404 / 500
  if (!response.ok) {
    const message =
      response.status === 404
        ? "Not found"
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

// limit=0 -> all products, filtering is done on client side
export function getAllProducts(signal) {
  return request(`/products?limit=0&select=${LIST_FIELDS}`, signal);
}

export function getProductsByCategory(slug, signal) {
  return request(
    `/products/category/${encodeURIComponent(slug)}?limit=0&select=${LIST_FIELDS}`,
    signal
  );
}

export function getCategories(signal) {
  return request("/products/categories", signal);
}

export function getProductById(id, signal) {
  return request(`/products/${encodeURIComponent(id)}`, signal);
}
