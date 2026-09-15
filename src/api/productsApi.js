const BASE_URL = "https://dummyjson.com";

// the listing only needs these fields, id is always included by the API
const LIST_FIELDS = "title,price,rating,thumbnail,brand,category";

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  // fetch only rejects on network errors, so 404 / 500 have to be checked here
  if (!response.ok) {
    const message =
      response.status === 404
        ? "Not found"
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

// limit=0 returns every product, brand and price filtering happen on the client
export function getAllProducts(signal) {
  return request(`/products?limit=0&select=${LIST_FIELDS}`, signal);
}

export function getProductsByCategory(slug, signal) {
  return request(
    `/products/category/${encodeURIComponent(slug)}?limit=0&select=${LIST_FIELDS}`,
    signal
  );
}

// returns [{ slug, name, url }]
export function getCategories(signal) {
  return request("/products/categories", signal);
}

export function getProductById(id, signal) {
  return request(`/products/${encodeURIComponent(id)}`, signal);
}
