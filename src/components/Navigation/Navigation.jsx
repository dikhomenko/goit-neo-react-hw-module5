import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <nav className={styles.navigation}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/movies">Movies</NavLink>
  </nav>
);

export default Navigation;
