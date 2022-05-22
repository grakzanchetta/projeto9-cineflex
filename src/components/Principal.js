import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Filme from "./Filme";
import Container from "./Container";

export default function Principal (){
    
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then((resposta) =>{
            const {data} = resposta;
            setFilmes(data);
        });
    }, [])

    function renderizarFilmes (){
        return filmes.map(filme => {
            return <Filme 
            key={filme.id}
            id={filme.id}
            poster={filme.posterURL}
            />
        })
    }

    const filmesRenderizados = renderizarFilmes();
    
    return (
        <Container>
            <h1>Selecione o Filme</h1>
            <Filmes>
                {filmesRenderizados}
            </Filmes>
        </Container>

    )
}

const Filmes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;