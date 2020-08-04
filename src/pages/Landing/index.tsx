import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/img/logo.svg';
import heroImg from '../../assets/img/hero.svg';

import promoveIcon from '../../assets/img/icons/promote.svg';
import searchIcon from '../../assets/img/icons/search.svg';
import heartIcon from '../../assets/img/icons/heart.svg';

import './styles.css';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content">
        <div className="logo-container">
          <img src={logoImg} alt="Logo Jobber"/>
          <h2>Sua plataforma favorita para freelancer.</h2>
        </div>

        <img
          src={heroImg}
          alt="Plataforma para freelancer"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/promote" className="promove">
            <img src={promoveIcon} alt="Promover trabalhos"/>
            Promover trabalhos
          </Link>

          <Link to="/search" className="search">
            <img src={searchIcon} alt="Procurar freelancers"/>
            Procurar freelancers
          </Link>
        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas.
          <img src={heartIcon} width="15rem" alt="Coração"/>
        </span>
      </div>
    </div>
  )
}

export default Landing;