import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Assento from "./Assento";
import Container from "./Container";

export default function Assentos (){
    const {idSessao} = useParams();
    const [sessao, setSessao] = useState(null);
    const [cadeiras, setCadeiras] = useState([]);

    useEffect(() => {
            const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
            promise.then((resposta) => {
            const {data} = resposta;
            console.log(data);
            setSessao(data);
        })
    }, [])

    function renderizarLugares(){
        if (sessao !== null){
            return sessao.seats.map((seat) =>{
                const {id, name, isAvaliable} = seat
                return <Assento numero={name} />
            })
        }

    }

    const lugares = renderizarLugares();
   // const legenda = renderizarLegendas();

    return(
       <Container>
           <h1>Selecione o(s) assento(s)</h1>
           <Lugares>{lugares}</Lugares>
       </Container>
    )
}

const Lugares = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;