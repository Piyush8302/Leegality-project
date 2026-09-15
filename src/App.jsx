import { useEffect } from "react";
import { getAllProducts } from "./api/productsApi";
import { paginate, getPageNumbers } from "./utils/paginate";

function App() {
  useEffect(() => {
    getAllProducts().then((data) => {
      const products = data.products;

      const page1 = paginate(products, 1);
      console.log("1. Page 1:", page1.items.length, "items,", page1.totalPages, "pages");

      const last = paginate(products, 17);
      console.log("2. Last page:", last.items.length, "items");

      console.log("3. page=99 →", paginate(products, 99).currentPage);
      console.log("4. page=-5 →", paginate(products, -5).currentPage);
      console.log("5. page='abc' →", paginate(products, "abc").currentPage);
      console.log("6. Empty list:", paginate([], 1));

      console.log("7. Buttons on page 1:", getPageNumbers(1, 17));
      console.log("8. Buttons on page 8:", getPageNumbers(8, 17));
      console.log("9. Buttons on page 17:", getPageNumbers(17, 17));
      console.log("10. Only 3 pages:", getPageNumbers(2, 3));
    });
  }, []);

  return <h1>Leegality Product App</h1>;
}

export default App;