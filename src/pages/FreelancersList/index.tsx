import React, { useState, FormEvent } from 'react';

// Components
import PageHeader from '../../components/PageHeader/Index';
import FreelancerItem, { Freelancer } from '../../components/FreelancerItem';

import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';

function FreelancersList() {
  const [freelancers, setFreelancers] = useState([]);

  const [service, setService] = useState('');
  const [cost, setCost] = useState('');

  function searchFreelancers(e: FormEvent) {
    e.preventDefault();

    api.get('/services', {
      params: {
        service,
        cost
      }
    }).then((response) => {      
      setFreelancers(response.data)
    });
  }
  
  return (
    <div id="page-freelancer-list" className="container">
      <PageHeader title="Esses são os Jobbers disponíveis.">
        <form id="search-freelancers" onSubmit={searchFreelancers}>
        <Select
            label="Serviço"
            name="service"
            value={service}
            onChange={e => { setService(e.target.value) }}
            options={[
              { value: 'Desenvolvimento web', label: 'Desenvolvimento web' },
              { value: 'Desenvolvimento mobile', label: 'Desenvolvimento mobile' },
              { value: 'Social media', label: 'Social media' },
              { value: 'Gestão de tráfego', label: 'Gestão de tráfego' },
              { value: 'Redação', label: 'Redação' },
              { value: 'Design de Interfaces', label: 'Design de Interfaces' },
              { value: 'Tradução', label: 'Tradução' },
              { value: 'Criação de logo', label: 'Criação de logo' },
              { value: 'Edição de vídeo', label: 'Edição de vídeo' },
              { value: 'Fotografia', label: 'Fotografia' },
            ]}
          />

          <Select
            label="Preço/hora de trabalho"
            name="cost"
            value={cost}
            onChange={e => { setCost(e.target.value) }}
            options={[
              { value: '0-20', label: 'Até R$ 20,00' },
              { value: '20-50', label: 'Acima de R$20,00 e abaixo de R$ 50,00' },
              { value: '50-100', label: 'Acima de R$50,00 e abaixo de R$ 100,00' },
              { value: '100', label: 'Acima de R$100,00' },
            ]}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {freelancers.map((freelancer: Freelancer) => {
          return (
            <FreelancerItem key={freelancer.id} freelancer={freelancer} />
          )
        })}
      </main>
    </div>
  )
}

export default FreelancersList;