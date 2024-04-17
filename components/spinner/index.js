import styles from "./loader.module.css";

export default function Spinner() {
  return (
    <div>
      <span className={styles.loader}></span>;
    </div>
  );
}
