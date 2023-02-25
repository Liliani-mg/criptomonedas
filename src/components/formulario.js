import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "./hooks/useMoneda";
import useCriptomoneda from "./hooks/useCriptomoneda";
import MensajeEror from "./Error";
import axios from "axios";

const Boton = styled.input`
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    color: #fff;
    background-color: #66a2fe;
    border: none;
    border-radius: 10px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = function ({guardarMoneda, guardarCriptomoneda}) {

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Estadounidense'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'ARS', nombre: 'Peso Argentino'}
    ]

    //un state para error
    const [ error, guardarError] = useState(false)

    //usando useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);
    
    //guardando la consulta del la api en el estado
    const [ listadoCriptomonedas, actualizarEstadoCriptomonedas] = useState([])
    
    //usando use Criptomoneda
    const [criptomoneda, SelectCriptoMonedas] = useCriptomoneda('Elige tu criptoMoneda', '',listadoCriptomonedas);
    //Ejecutar el llamado a la API
    useEffect(() => {
        const consultarApi = async() => {
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
        const resultado = await axios.get(url)
        actualizarEstadoCriptomonedas(resultado.data.Data)
        }
        consultarApi()
    }, [])

    const cotizarMoneda = (e) =>{
        e.preventDefault()
        //validar si los dos campos estan completos
        if(!moneda || !criptomoneda){
            guardarError(true)
            return
        }
        //en caso de que si este completo, paso los datos al componente principal
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)
    }

    return(
        <form
        onSubmit={cotizarMoneda}
        >
        {/* en caso de que exista el error, mando un mensaje para que se imprima en la pag */}
        { error ? <MensajeEror mensaje = 'Todos los campos son obligatorios'/> : null}

            <SelectMonedas/>
            <SelectCriptoMonedas/>
            <Boton
                type= "submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;