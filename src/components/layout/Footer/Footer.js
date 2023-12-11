import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy_right}>
        <span>Supply Chain Project &copy; 2023</span>
      </p>
    </footer>
  );
}
export default Footer;
