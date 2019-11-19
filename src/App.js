import React, { useState, useEffect } from 'react';
import axios from 'axios';

import image from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda === '' || criptomoneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      
      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };

    cotizarCriptomoneda();
  }, [criptomoneda, moneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={image} alt="img" className="" />
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
          <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
