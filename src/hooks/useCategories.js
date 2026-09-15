import { useEffect, useState } from "react";
import { getCategories } from "../api/productsApi";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        setError("");

        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories, loading, error };
}
