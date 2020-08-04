import React from 'react';

// Components
import PageHeader from '../../components/PageHeader/Index';
import FreelancerItem from '../../components/FreelancerItem';

import './styles.css';

function FreelancersList() {
  return (
    <div id="page-freelancer-list" className="container">
      <PageHeader title="Esses são os Jobbers disponíveis.">
        <form id="search-freelancers">
          <div className="input-block">
            <label htmlFor="profession">Profissão</label>
            <input type="text" id="profession"/>
          </div>

          <div className="input-block">
            <label htmlFor="price">Preço por hora</label>
            <input type="text" id="price"/>
          </div>
        </form>
      </PageHeader>

      <main>
        <FreelancerItem />
        <FreelancerItem />
        <FreelancerItem />
        <FreelancerItem />
      </main>
    </div>
  )
}

export default FreelancersList;