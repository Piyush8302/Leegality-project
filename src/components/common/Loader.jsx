import styles from "./Common.module.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className={styles.center} role="status">
      <div className={styles.spinner} />
      <p className={styles.loaderText}>{text}</p>
    </div>
  );
}

export default Loader;
