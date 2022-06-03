import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import getYupValidationErrors from "../../utils/getValiationErros";

import PageHeader from "../../components/PageHeader/Index";

import Input from "../../components/Input";

import warningIcon from "../../assets/img/icons/warning.svg";

import "./styles.css";
import Textarea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services/api";
import CustomModal from "../../components/Modal";

type Errros = {
  name?: string;
  whatsapp?: string;
  service?: string;
  cost?: string;
  skillItems?: string;
};

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  whatsapp: yup.string().required("O numéro do whatsapp é obrigatório"),
  service: yup.string().required("O serviço é obrigatório"),
  cost: yup.number().min(1, "O valor é obrigatório"),
  // skills: yup
  //   .array(
  //     yup.object().shape({
  //       skill: yup.string().required("A habilidade é obrigatória"),
  //       level: yup.string().required("O nível é obrigatório"),
  //     })
  //   )
  //   .required("Você precisa informar pelo menos uma habilidade")
  //   .of(yup.string()),
});

const removeDuplicatedItensById = (array: any) => {
  let hasDuplicated = false;

  array.forEach((item: any) => {
    if (
      array.filter((newItem: any) => newItem.skill === item.skill).length > 1
    ) {
      hasDuplicated = true;
    }
  });

  return hasDuplicated;
};

function FreelancerForm() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [portifolio, setPortifolio] = useState("");
  const [bio, setBio] = useState("");

  const [service, setService] = useState("");
  const [cost, setCost] = useState("");

  const [skillItems, setSkillItems] = useState([{ skill: "", level: "" }]);

  const [errors, setErrors] = useState<Errros>({} as Errros);

  function addNewSkillItem() {
    const newSkillItem = {
      skill: "",
      level: "",
    };

    setSkillItems([...skillItems, newSkillItem]);
  }

  function removeSkill(id: number) {
    const newSkillItems = skillItems.filter((item, index) => index !== id);

    setSkillItems(newSkillItems);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    setErrors({} as Errros);

    const filteredSkillItems = skillItems.filter((item) => item.skill);

    const body = {
      name,
      avatar,
      whatsapp,
      bio,
      portifolio,
      service,
      cost: Number(cost),
      skills: filteredSkillItems,
    };

    const duplicate = removeDuplicatedItensById(filteredSkillItems);

    try {
      if (duplicate) {
        alert("Duas skills com o mesmo nome não podem ser cadastradas");
        return;
      }

      await schema.validate(body, { abortEarly: false });

      await api.post("/services", {
        name,
        avatar,
        whatsapp,
        bio,
        portifolio,
        service,
        cost: Number(cost),
        skills: skillItems,
      });
      alert("Cadastro realizado com sucesso!");
      // history.push("/");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorsValidate = getYupValidationErrors(error);

        setErrors(errorsValidate);
      } else {
        alert("Erro no cadastro!");
      }
    }
  }

  function setSkillItemValue(position: number, field: string, value: string) {
    const updateSkillItems = skillItems.map((skillItem, index) => {
      if (index === position) {
        return { ...skillItem, [field]: value };
      }

      return skillItem;
    });

    setSkillItems(updateSkillItems);
  }

  function handleLogin() {
    if (!whatsapp) {
      setErrors({ ...errors, whatsapp: "O numero do whatsapp é obrigatório" });
      return;
    }
    setShowModal(false);

    history.push(`/contacts?whatsapp=${whatsapp}`);
  }

  return (
    <div id="page-freelancer-form" className="container">
      <CustomModal
        title="Login"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Input
          label="WhatsApp"
          name="whatsapp"
          value={whatsapp}
          error={errors.whatsapp}
          onChange={(e) => {
            setWhatsapp(e.target.value);
          }}
        />

        <button
          style={{
            marginTop: "40px",
          }}
          type="button"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </CustomModal>

      <PageHeader
        title="Ficaremos felizes em ter você conosco."
        description="O primeiro passo é preencher esse formulário."
      >
        <button type="button" onClick={() => setShowModal(true)}>
          Trabalho promovido
        </button>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              error={errors.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />

            <Input
              label="WhatsApp"
              name="whatsapp"
              error={errors.whatsapp}
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />

            <Input
              label="Portifólio"
              name="portifolio"
              value={portifolio}
              onChange={(e) => {
                setPortifolio(e.target.value);
              }}
            />

            <Textarea
              label="Fale um pouco sobre você"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre o serviço</legend>

            <Select
              label="Serviço"
              name="service"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
              }}
              options={[
                { value: "Desenvolvimento web", label: "Desenvolvimento web" },
                {
                  value: "Desenvolvimento mobile",
                  label: "Desenvolvimento mobile",
                },
                { value: "Social media", label: "Social media" },
                { value: "Gestão de tráfego", label: "Gestão de tráfego" },
                { value: "Redação", label: "Redação" },
                {
                  value: "Design de Interfaces",
                  label: "Design de Interfaces",
                },
                { value: "Tradução", label: "Tradução" },
                { value: "Criação de logo", label: "Criação de logo" },
                { value: "Edição de vídeo", label: "Edição de vídeo" },
                { value: "Fotografia", label: "Fotografia" },
              ]}
            />
            {errors.service && (
              <div className="error">
                <small className="error-text">{errors.service}</small>
              </div>
            )}

            <Input
              label="Custo da sua hora trabalhada"
              name="cost"
              error={errors.cost}
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Selecione suas habilidades
              <button type="button" onClick={addNewSkillItem}>
                + nova habilidade
              </button>
            </legend>

            {errors.skillItems && (
              <div className="error">
                <small className="error-text">{errors.skillItems}</small>
              </div>
            )}

            {skillItems.map((skillItem, index) => {
              return (
                <div key={index} className="skill-item">
                  <Input
                    label="Habilidade"
                    name="skill"
                    value={skillItem.skill}
                    onChange={(e) =>
                      setSkillItemValue(index, "skill", e.target.value)
                    }
                  />

                  <div
                    style={{
                      width: 20,
                    }}
                  />

                  <Select
                    label="Nível"
                    name="level"
                    value={skillItem.level}
                    onChange={(e) =>
                      setSkillItemValue(index, "level", e.target.value)
                    }
                    options={[
                      { value: "Iniciante", label: "Iniciante" },
                      { value: "Intermediário", label: "Intermediário" },
                      { value: "Avançado", label: "Avançado" },
                    ]}
                  />

                  {skillItems.length > 1 && (
                    <button type="button" onClick={() => removeSkill(index)}>
                      Excluir habilidade
                    </button>
                  )}
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              importante! <br />
              Preencha todos os dados.
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default FreelancerForm;
