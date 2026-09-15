import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import EmptyState from "../components/common/EmptyState";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="container">
        <EmptyState
          title="Page not found"
          message="The page you are looking for does not exist."
          actionText="Go to products"
          onAction={() => navigate("/")}
        />
      </main>
    </>
  );
}

export default NotFoundPage;
