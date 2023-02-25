import React from "react";
import styled from "@emotion/styled";


const ResultadoDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    return(
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Ultima actulización: <span></span>{resultado.LASTUPDATE}</Info>
            <Info>El precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio más alto la ultima hora <span>{resultado.HIGHHOUR}</span></Info>
            <Info>El precio más bajo la última hora <span>{resultado.LOWHOUR}</span></Info>

        </ResultadoDiv>
     );
}

export default Cotizacion;
