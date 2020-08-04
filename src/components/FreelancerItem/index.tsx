import React from 'react';

import whatsappIcon from '../../assets/img/icons/whatsapp.svg';

import './styles.css';

function FreelancerItem() {
  return (
    <article className="freelancer-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/55659197?s=460&u=c0c3565ad51e676592c2b47436c7ae99cb902eef&v=4" alt="João Filipe"/>
        <div>
          <strong>João Filipe</strong>
          <span>Desenvolvedor web</span>
        </div>
      </header>

      <p>
      Estudante de Engenharia de Software na Universidade Tecnológica Federal do Paraná (UTFPR), Desenvolvedor Frontend com React, Mobile com React Native e Backend com Node.

      Entusiasta em Design de interfaces e UX, o Figma é a minha ferramenta de criação.
      </p>

      <footer>
        <p>
          Preço/hora de trabalho
          <strong>R$ 60,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato.
        </button>
      </footer>
    </article>
  );
}

export default FreelancerItem;