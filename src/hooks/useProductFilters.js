import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Filters live in the URL so they survive refresh and going back from the detail page.
const PARAMS = {
  CATEGORY: "category",
  BRAND: "brand",
  MIN_PRICE: "minPrice",
  MAX_PRICE: "maxPrice",
  SEARCH: "q",
  PAGE: "page",
};

// empty values are removed so the URL stays clean
function setOrDelete(params, key, value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    params.delete(key);
  } else {
    params.set(key, String(value).trim());
  }
}

// ignore invalid prices typed into the URL, e.g. minPrice=abc
function readPrice(params, key) {
  const value = params.get(key);
  if (value === null || value.trim() === "") return "";
  return Number.isNaN(Number(value)) ? "" : value;
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      category: searchParams.get(PARAMS.CATEGORY) ?? "",
      brands: searchParams.getAll(PARAMS.BRAND),
      minPrice: readPrice(searchParams, PARAMS.MIN_PRICE),
      maxPrice: readPrice(searchParams, PARAMS.MAX_PRICE),
      search: searchParams.get(PARAMS.SEARCH) ?? "",
      page: Number(searchParams.get(PARAMS.PAGE)) || 1,
    }),
    [searchParams]
  );

  // every filter change goes back to page 1 unless told otherwise.
  // replace: true so filter clicks don't pile up in browser history
  const updateParams = useCallback(
    (changeFn, { resetPage = true } = {}) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          changeFn(next);
          if (resetPage) {
            next.delete(PARAMS.PAGE);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // brands of the old category may not exist in the new one, so clear them
  const setCategory = useCallback(
    (slug) => {
      updateParams((params) => {
        setOrDelete(params, PARAMS.CATEGORY, slug);
        params.delete(PARAMS.BRAND);
      });
    },
    [updateParams]
  );

  const toggleBrand = useCallback(
    (brand) => {
      updateParams((params) => {
        const selected = params.getAll(PARAMS.BRAND);
        params.delete(PARAMS.BRAND);

        const updated = selected.includes(brand)
          ? selected.filter((item) => item !== brand)
          : [...selected, brand];

        updated.forEach((item) => params.append(PARAMS.BRAND, item));
      });
    },
    [updateParams]
  );

  const setPriceRange = useCallback(
    (minPrice, maxPrice) => {
      updateParams((params) => {
        setOrDelete(params, PARAMS.MIN_PRICE, minPrice);
        setOrDelete(params, PARAMS.MAX_PRICE, maxPrice);
      });
    },
    [updateParams]
  );

  const setSearch = useCallback(
    (text) => {
      updateParams((params) => {
        setOrDelete(params, PARAMS.SEARCH, text);
      });
    },
    [updateParams]
  );

  // keep current filters, only change the page
  const setPage = useCallback(
    (page) => {
      updateParams(
        (params) => {
          setOrDelete(params, PARAMS.PAGE, page > 1 ? page : "");
        },
        { resetPage: false }
      );
    },
    [updateParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const hasActiveFilters =
    Boolean(filters.category) ||
    filters.brands.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    Boolean(filters.search);

  return {
    filters,
    hasActiveFilters,
    setCategory,
    toggleBrand,
    setPriceRange,
    setSearch,
    setPage,
    clearFilters,
  };
}
