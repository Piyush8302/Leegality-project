import Header from "./components/header/Header";
import ProductGrid from "./components/product/ProductGrid";
import Pagination from "./components/pagination/Pagination";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import { useProducts } from "./hooks/useProducts";
import { useProductFilters } from "./hooks/useProductFilters";
import { paginate } from "./utils/paginate";

function App() {
  const { products, loading, error, retry } = useProducts("");
  const { filters, setPage } = useProductFilters();
  const page = paginate(products, filters.page);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <main className="container">
        {loading && <Loader text="Loading products..." />}
        {error && <ErrorMessage message={error} onRetry={retry} />}
        {!loading && !error && (
          <>
            <ProductGrid products={page.items} />
            <Pagination
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
