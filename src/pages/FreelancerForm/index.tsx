import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader/Index';

import Input from '../../components/Input';

import warningIcon from '../../assets/img/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

function FreelancerForm() {
  const [skillItems, setSkillItems] = useState([{ skill: '', level: '', }])

  function addNewSkillItem() {
    const newSkillItem = {
      skill: '',
      level: '',
    }

    setSkillItems([...skillItems, newSkillItem])
  }

  return (
    <div id="page-freelancer-form" className="container">
      <PageHeader
        title="Ficaremos felizes em ter você conosco."
        description="O primeiro passo é preencher esse formulário."
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>

          <Input label="Nome completo" name="name" />
          <Input label="Avatar" name="avatar" />
          <Input label="WhatsApp" name="whatsapp" />
          <Input label="Portifólio" name="portifolio" />
          <Textarea label="Fale um pouco sobre você" name="bio" />
        </fieldset>

        <fieldset>
          <legend>Sobre o serviço</legend>

          <Select
            label="Serviço"
            name="service"
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
          <Input label="Custo da sua hora trabalhada" name="cost" />
        </fieldset>

        <fieldset>
          <legend>
            Selecione suas habilidades
            <button type="button" onClick={addNewSkillItem}>+ nova habilidade</button>
          </legend>

          {skillItems.map(skillItem => {
            return (
              <div key={skillItem.skill} className="skill-item">
                <Input label="Habilidade" name="skill" />
                <Select
                label="Nível"
                name="level"
                options={[
                  { value: 'Iniciante', label: 'Iniciante' },
                  { value: 'Intermediário', label: 'Intermediário' },
                  { value: 'Avançado', label: 'Avançado' },
                ]}
                />
              </div>
            );
          })}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            importante! <br/>
            Preencha todos os dados.
          </p>

          <button type="button">
            Salvar cadastro
          </button>
        </footer>
      </main>
    </div>
  )
}

export default FreelancerForm;