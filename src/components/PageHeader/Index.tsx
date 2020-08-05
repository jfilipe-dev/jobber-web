import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/img/logo.svg';
import backIcon from '../../assets/img/icons/back.svg';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return(
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="voltar"/>
        </Link>
        <img src={logoImg} alt="Logo Jobber"/>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}
        
        {props.children}
      </div>
    </header>
  )
}

export default PageHeader;