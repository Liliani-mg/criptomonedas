import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.96e45d69.png";
import Formulario from "./components/formulario";
import Cotizacion from "./components/Cotizacion";

//styled-components crea un componente al mismo tiempo que definimos sus estilos.

const Contenedor = styled.div`  
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 2rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2Fe;
    display: block;
  }
`;


function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado ] = useState({});

  useEffect(() => {

      const cotizarCriptomoneda = async () => {
        //evitamos la ejecucion la primera vez
        if(moneda === '') return;
    
        //consultar la api para obtner la ctizacion 
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const resultado= await axios.get(url)
    
       guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }
    
      cotizarCriptomoneda()
  },[moneda, criptomoneda]) //con esta parte busco que se ejecute una sola vez, a la primera


  return (
   <Contenedor>
    <div>
      <Imagen
        src={imagen}
        alt="imagen criptomonedas"
      />
    </div>
    <div>
      <Heading>Cotizador de Criptomonedas</Heading>
      <Formulario
      guardarMoneda = {guardarMoneda}
      guardarCriptomoneda = {guardarCriptomoneda}
      />

      <Cotizacion
        resultado={resultado}
      />
      
    </div>
   </Contenedor>
  );
}

export default App;

