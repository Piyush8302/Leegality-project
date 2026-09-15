import styles from "./Common.module.css";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.center} role="alert">
      <span className={styles.icon}>⚠️</span>
      <p className={styles.errorTitle}>Something went wrong</p>
      {message && <p className={styles.message}>{message}</p>}

      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
