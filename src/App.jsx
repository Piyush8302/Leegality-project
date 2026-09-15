import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import EmptyState from "./components/common/EmptyState";
import Rating from "./components/common/Rating";

function App() {
  return (
    <div className="container">
      <h1>Common components test</h1>

      <h3>Rating</h3>
      <p><Rating value={5} /></p>
      <p><Rating value={4.5} /></p>
      <p><Rating value={3.2} /></p>
      <p><Rating value={0} /></p>

      <h3>Loader</h3>
      <Loader text="Loading products..." />

      <h3>Error</h3>
      <ErrorMessage
        message="Request failed with status 500"
        onRetry={() => console.log("retry clicked")}
      />

      <h3>Empty state</h3>
      <EmptyState
        message="Try changing or clearing your filters."
        actionText="Clear all filters"
        onAction={() => console.log("clear clicked")}
      />
    </div>
  );
}

export default App;
