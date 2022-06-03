import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import backIcon from "../../assets/img/icons/back.svg";
import api from "../../services/api";

const Contacts: React.FC = () => {
  const { search } = useLocation();
  const whatsapp = search.split("=")[1];
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    api.get(`/connections/${whatsapp}`).then((response) => {
      setConnections(response.data.connections);
    });
  }, [whatsapp]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 80,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-4)",
          width: 60,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Link to="/promote">
          <img
            style={{
              width: 40,
            }}
            src={backIcon}
            alt="voltar"
          />
        </Link>
      </div>

      <h1
        style={{
          textAlign: "center",
        }}
      >
        Meus contatos
      </h1>

      {connections.map((item: any) => (
        <div
          style={{
            maxWidth: "80%",
            margin: "auto",
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
          }}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
