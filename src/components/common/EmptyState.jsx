import styles from "./Common.module.css";

function EmptyState({ title = "No products found", message, actionText, onAction }) {
  return (
    <div className={styles.center}>
      <span className={styles.icon}>🔍</span>
      <p className={styles.title}>{title}</p>
      {message && <p className={styles.message}>{message}</p>}

      {onAction && (
        <button className="btn" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
