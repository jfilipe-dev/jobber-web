import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader/Index';

import Input from '../../components/Input';

import warningIcon from '../../assets/img/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function FreelancerForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [portifolio, setPortifolio] = useState('');
  const [bio, setBio] = useState('');

  const [service, setService] = useState('');
  const [cost, setCost] = useState('');

  const [skillItems, setSkillItems] = useState([{ skill: '', level: '', }])

  function addNewSkillItem() {
    const newSkillItem = {
      skill: '',
      level: '',
    }

    setSkillItems([...skillItems, newSkillItem])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('/services', {
      name,
      avatar,
      whatsapp,
      bio,
      portifolio,
      service,
      cost: Number(cost),
      skills: skillItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
    }).catch(() => {
      alert('Erro no cadastro!');
    });

    console.log(
      {
      name,
      avatar,
      whatsapp,
      portifolio,
      bio,
      service,
      cost,
      skillItems
      }
    )
  }

  function setSkillItemValue(position:number, field: string, value: string) {
    const updateSkillItems = skillItems.map((skillItem, index) => {
      if(index === position) {
        return {...skillItem, [field]: value }
      }

      return skillItem;
    });

    setSkillItems(updateSkillItems);
  }

  return (
    <div id="page-freelancer-form" className="container">
      <PageHeader
        title="Ficaremos felizes em ter você conosco."
        description="O primeiro passo é preencher esse formulário."
      />

      <main>
        <form onSubmit={handleCreateClass}> 
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />

            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
            />

            <Input
              label="WhatsApp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
            />

            <Input
              label="Portifólio"
              name="portifolio"
              value={portifolio}
              onChange={(e) => { setPortifolio(e.target.value) }}
            />

            <Textarea
              label="Fale um pouco sobre você"
              name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre o serviço</legend>

            <Select
              label="Serviço"
              name="service"
              value={service}
              onChange={(e) => { setService(e.target.value) }}
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
            <Input
              label="Custo da sua hora trabalhada"
              name="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Selecione suas habilidades
              <button type="button" onClick={addNewSkillItem}>+ nova habilidade</button>
            </legend>

            {skillItems.map((skillItem, index) => {
              return (
                <div key={index} className="skill-item">
                  <Input
                    label="Habilidade"
                    name="skill"
                    value={skillItem.skill}
                    onChange={e => setSkillItemValue(index, 'skill', e.target.value)}
                  />

                  <Select
                  label="Nível"
                  name="level"
                  value={skillItem.level}
                  onChange={e => setSkillItemValue(index, 'level', e.target.value)}
                  options={[
                    { value: 'Iniciante', label: 'Iniciante' },
                    { value: 'Intermediário', label: 'Intermediário' },
                    { value: 'Avançado', label: 'Avançado' },
                  ]}
                  />
                </div>
              );
            }            
            )}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              importante! <br/>
              Preencha todos os dados.
            </p>

            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default FreelancerForm;