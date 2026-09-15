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
        console.log("Products response:", response);

        if (!ignore) {
          setProducts(response.products);
        }
      } catch (err) {
        console.log("Products error:", err);
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

    return () => {
      ignore = true;
    };
  }, [category, retryCount]);

  function retry() {
    setRetryCount(retryCount + 1);
  }

  return { products, loading, error, retry };
}