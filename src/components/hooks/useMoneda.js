import React,  {Fragment, useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
`;

const useMoneda =  (label, stateInicial, opciones) => {
    //este es el State del hook que creamos
    const [state, actualizarState] = useState(stateInicial)

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
            <option value="">-Seleccione Moneda</option>
            {opciones.map( opcion => (
                     <option 
                     value={opcion.codigo} 
                     key = {opcion.codigo}
                     >{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )

    //Aca retorna el state, interfaz que seria seleccionar y fn que modifica el state
    return [state, Seleccionar, actualizarState];
}

export default useMoneda;