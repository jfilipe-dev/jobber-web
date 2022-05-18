import React, { useEffect, useState } from "react";

import whatsappIcon from "../../assets/img/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";
import formatValue from "../../utils/formatValue";

export interface Freelancer {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  portifolio: string;
  service: string;
  cost: number;
}

interface FreelancerItemProps {
  freelancer: Freelancer;
}

interface SkillItem {
  id: number;
  skill: string;
  level: string;
}

const FreelancerItem: React.FC<FreelancerItemProps> = ({ freelancer }) => {
  const [skills, setSkills] = useState<SkillItem[]>([]);

  function createNewConnection() {
    api.post("/connections", {
      user_id: freelancer.id,
    });
  }

  useEffect(() => {
    api.get(`/skills/${freelancer.id}`).then((response) => {
      setSkills(response.data.skills);
    });
  }, [freelancer.id]);

  return (
    <article className="freelancer-item">
      <header>
        <img src={freelancer.avatar} alt={freelancer.name} />
        <div>
          <strong>{freelancer.name}</strong>
          <span>{freelancer.service}</span>
        </div>
      </header>

      <p>{freelancer.bio}</p>

      <p>
        <strong>Habilidades</strong>
        {skills.map((skill) => {
          return (
            <span key={skill.id} className="skill-item">
              {skill.level} em <span>{skill.skill}</span>
            </span>
          );
        })}
      </p>

      <p>
        {freelancer.portifolio ? (
          <a href={freelancer.portifolio}>Acessar portifólio</a>
        ) : (
          "Esse jobber não possui portifólio."
        )}
      </p>

      <footer>
        <p>
          Preço/hora de trabalho
          <strong>{formatValue(freelancer.cost)}</strong>
        </p>

        <a
          onClick={createNewConnection}
          href={`https://wa.me/${freelancer.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato.
        </a>
      </footer>
    </article>
  );
};

export default FreelancerItem;
