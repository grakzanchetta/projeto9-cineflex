import {useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";

import Container from "./Container";
import Diasessao from "./Diasessao";

export default function Sessoes (){
    const {idFilme} = useParams();
    
    const [filme, setFilme] = useState(null);
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then((resposta) => {
            const {data} = resposta;
            setFilme(data);
        });
    }, [])

    function renderizarSessao (){
        if(filme !== null){
        return filme.days.map(dia => {
            return <Diasessao key={dia.id} dia={dia.weekday} data={dia.date} sessoes={dia.showtimes} />
        })
    }
}

    const sessoesRenderizadas = renderizarSessao();

    function renderizarFooter(){
        if (filme !== null){
            return (
            <>
              <img src={filme.posterURL} alt={filme.title} />
              <h1>{filme.title}</h1>
            </>
            )
        }
    }

    const footerRenderizado = renderizarFooter();
    return (
        <Container>
            <h1>Selecione o Horário</h1>
            <Dias>
                {sessoesRenderizadas}
            </Dias>
            <Footer>
                {footerRenderizado}
            </Footer>
        </Container>
    )
}

const Dias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: var(--cor-footer);

  img {
    width: 56px;
    height: 80px;
    padding: 8px;
    border-radius: 2px;
    margin: 10px;
    box-shadow: 0px 2px 4px 0px #0000001A;
    border: 1px solid #9EADBA;
  }

  h1 {
    font-size: 26px;
  }`