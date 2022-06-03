import React, { useEffect, useMemo, useState } from "react";

import whatsappIcon from "../../assets/img/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";
import formatValue from "../../utils/formatValue";
import CustomModal from "../Modal";
import Input from "../Input";
import Textarea from "../TextArea";

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
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bio, setBio] = useState("");

  const image = useMemo(
    () =>
      `https://avatars.dicebear.com/api/adventurer-neutral/${Math.random()}.svg`,
    []
  );

  async function createNewConnection() {
    await api.post("/connections", {
      user_id: freelancer.id,
      message: bio,
    });
    setShowModal(false);
    alert("Conexão criada com sucesso!");
  }

  const currentSkills = skills.filter((item) => item.skill && item.level);

  useEffect(() => {
    api.get(`/skills/${freelancer.id}`).then((response) => {
      setSkills(response.data.skills);
    });
  }, [freelancer.id]);

  return (
    <article className="freelancer-item">
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Entrar em contato"
      >
        <Textarea
          label="Descreva seu projeto"
          name="bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <button
          style={{
            marginTop: "40px",
          }}
          type="button"
          onClick={createNewConnection}
        >
          Enviar contato
        </button>
      </CustomModal>

      <header>
        <img
          src={imageError ? image : freelancer.avatar}
          alt={freelancer.name}
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div>
          <strong>{freelancer.name}</strong>
          <span>{freelancer.service}</span>
        </div>
      </header>

      {freelancer.bio !== "" ? <p>{freelancer.bio}</p> : <p>Sem bio</p>}

      {currentSkills.length > 0 ? (
        <p>
          <strong>Habilidades</strong>
          {currentSkills.map((skill) => {
            return (
              <span key={skill.id} className="skill-item">
                {skill.level} em <span>{skill.skill}</span>
              </span>
            );
          })}
        </p>
      ) : (
        <p>Habilidades não cadastradas</p>
      )}

      {freelancer.portifolio ? (
        <p>
          <a href={freelancer.portifolio}>Acessar portifólio</a>
        </p>
      ) : (
        <p>Esse jobber não possui portifólio.</p>
      )}

      <footer>
        <p>
          Preço/hora de trabalho
          <strong>{formatValue(freelancer.cost)}</strong>
        </p>

        <a onClick={() => setShowModal(true)}>Entrar em contato.</a>
      </footer>
    </article>
  );
};

export default FreelancerItem;
