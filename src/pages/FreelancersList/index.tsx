import React, {
  useState,
  FormEvent,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import PageHeader from "../../components/PageHeader/Index";
import FreelancerItem, { Freelancer } from "../../components/FreelancerItem";

import sadIcon from "../../assets/img/icons/sad.svg";

import "./styles.css";
import Select from "../../components/Select";
import api from "../../services/api";

function FreelancersList() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [service, setService] = useState("");
  const [cost, setCost] = useState("");
  const [hasPortfolio, setHasPortfolio] = useState("false");

  const loadFreelancers = useCallback(() => {
    setLoading(true);
    api
      .get("/services", {
        params: {
          service,
          cost,
        },
      })
      .then((response) => {
        setFreelancers(response.data);
        setLoading(false);
      });
  }, [cost, service]);

  const data = useMemo(() => {
    if (hasPortfolio === "true") {
      return freelancers.filter((freelancer: any) => freelancer.portifolio);
    }

    return freelancers;
  }, [freelancers, hasPortfolio]);

  useEffect(() => {
    loadFreelancers();
  }, [loadFreelancers]);

  return (
    <div id="page-freelancer-list" className="container">
      <PageHeader title="Esses são os Jobbers disponíveis.">
        <form id="search-freelancers">
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

          <Select
            label="Preço/hora"
            name="cost"
            value={cost}
            onChange={(e) => {
              setCost(e.target.value);
            }}
            options={[
              { value: "0-20", label: "Até R$ 20,00" },
              {
                value: "20-50",
                label: "Acima de R$20,00 e abaixo de R$ 50,00",
              },
              {
                value: "50-100",
                label: "Acima de R$50,00 e abaixo de R$ 100,00",
              },
              { value: "100", label: "Acima de R$100,00" },
            ]}
          />

          <Select
            label="Com portifólio?"
            name="portfolio"
            value={hasPortfolio}
            onChange={(e) => {
              setHasPortfolio(e.target.value);
            }}
            options={[
              { value: "true", label: "Sim" },
              { value: "false", label: "Não" },
            ]}
          />

          <button type="button">{loading ? "Carregando..." : "Filtrar"}</button>
        </form>
      </PageHeader>

      <main>
        {data.length ? (
          data.map((freelancer: Freelancer) => {
            return (
              <FreelancerItem key={freelancer.id} freelancer={freelancer} />
            );
          })
        ) : (
          <div id="empty-freelancer-list">
            <img src={sadIcon} alt="Ícone triste" />
            <h1>Ops...</h1>
            <p>Não encontramos jobbers com os filtros que você procurou.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default FreelancersList;
