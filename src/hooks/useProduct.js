import { useEffect, useState } from "react";
import { getProductById } from "../api/productsApi";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);
        console.log("Product response:", response);

        if (!ignore) {
          setProduct(response);
        }
      } catch (err) {
        console.log("Product error:", err);
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    // ignore the old response if id changes before it comes back
    return () => {
      ignore = true;
    };
  }, [id, retryCount]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { product, loading, error, retry };
}