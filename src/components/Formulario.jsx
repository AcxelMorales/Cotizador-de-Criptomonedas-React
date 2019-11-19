import React, { useState, useEffect } from "react";
import axios from "axios";

import Criptomoneda from "./Criptomoneda";
import Error from "./Error";

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  const [criptomonedas, setCriptomonedas] = useState([]);
  const [monedaCotizar, setMonedaCotizar] = useState("");
  const [criptomonedaCotizar, setCriptomonedaCotizar] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const submit = e => {
    e.preventDefault();

    if (monedaCotizar === "" || criptomonedaCotizar === "") {
      setError(true);
      return;
    }

    setError(false);
    setMoneda(monedaCotizar);
    setCriptomoneda(criptomonedaCotizar);
  };

  const componente = error ? (
    <Error mensaje="Ambos campos son obligatorios" />
  ) : null;

  return (
    <form onSubmit={submit}>
      {componente}

      <div className="row">
        <label>Elige tu moneda</label>
        <select
          className="u-full-width"
          onChange={e => setMonedaCotizar(e.target.value)}
        >
          <option value="">--- Elige tu moneda ---</option>
          <option value="USD">Dolar Estadounidense</option>
          <option value="MXN">Peso Mexicano</option>
          <option value="GBP">Libras</option>
          <option value="EUR">Euro</option>
        </select>
      </div>

      <div className="row">
        <label>Elige tu criptomoneda</label>
        <select
          className="u-full-width"
          onChange={e => setCriptomonedaCotizar(e.target.value)}
        >
          <option value="">--- Elige tu criptomoneda ---</option>
          {criptomonedas.map(criptomoneda => (
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda={criptomoneda}
            />
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calcular"
      />
    </form>
  );
};

export default Formulario;
