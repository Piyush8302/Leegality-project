import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productsApi";

export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        let response;
        if (category) {
          response = await getProductsByCategory(category);
        } else {
          response = await getAllProducts();
        }

        if (!ignore) {
          setProducts(response.products);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    // switching categories quickly: ignore the response of the old category
    return () => {
      ignore = true;
    };
  }, [category, retryCount]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { products, loading, error, retry };
}
