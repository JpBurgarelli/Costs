import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Container from './Container';
import logo from '../../img/costs_logo.png';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_conteudo}>
        <div className={styles.texto_logo}>
          <a href="/">
            <h3>COSTS</h3>
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className={styles.footer_conteudo_contato}>
          <h3>CONTATO</h3>
          <ul>
            <li>+55 21 9999-9999</li>
            <li>contato@costs.com</li>
            <li>Rua Almeida Ramos, 42 - Morumbi</li>
            <li>Campinas - SP</li>
            <div className={styles.footer_redes}>
              <a href="./">
                <FaFacebook />
              </a>
              <a href="./">
                <FaInstagram />
              </a>
              <a href="./">
                <FaLinkedin />
              </a>
            </div>
          </ul>
        </div>
        <div className={styles.footer_conteudo_info}>
          <h3>INFORMAÇÕES</h3>
          <ul>
            <li>Suporte</li>
            <li>Cotações</li>
            <li>Contato</li>
            <li>Termos e Condições</li>
          </ul>
        </div>
        <p className={styles.copy_right}>
          <span>COSTS</span> &copy; 2023
        </p>
      </div>
    </footer>
  );
}

export default Footer;
