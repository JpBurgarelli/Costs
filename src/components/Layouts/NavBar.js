import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './NavBar.module.css';
import logo from '../../img/costs_logo.png';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="costs" />
        </Link>
        <ul className={styles.list}>
          <li>
            <Link to="/" as="a">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Projects" as="a">
              Projeto
            </Link>
          </li>
          <li>
            <Link to="/Company" as="a">
              Empresa
            </Link>
          </li>
          <li>
            <Link to="/Contact" as="a">
              Contato
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
