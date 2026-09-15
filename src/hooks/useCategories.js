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
        console.log("Categories response:", response);

        setCategories(response);
      } catch (err) {
        console.log("Categories error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories, loading, error };
}