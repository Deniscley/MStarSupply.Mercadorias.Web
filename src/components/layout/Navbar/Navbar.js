import { Link } from "react-router-dom";
import Container from "../Container/Container";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.logo}>SUPPLY CHAIN</div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Início</Link>
          </li>
          <li className={styles.item}>
            <Link to="/mercadoria">Mercadoria</Link>
          </li>
          <li className={styles.item}>
            <Link to="/entrada">Entrada</Link>
          </li>
          <li className={styles.item}>
            <Link to="/saida">Saída</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
