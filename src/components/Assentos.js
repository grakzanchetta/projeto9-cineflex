import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Assento from "./Assento";
import Container from "./Container";

export default function Assentos (props){
    const {idSessao} = useParams();
    const navigate = useNavigate();
    const {finalizar} = props;
    const [sessao, setSessao] = useState(null);
    const [cadeiras, setCadeiras] = useState(new Map());
    const [compra, setCompra] = useState({nome: "", cpf: ""});

    useEffect(() => {
            const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
            promise.then((resposta) => {
            const {data} = resposta;
            setSessao(data);
        })
    }, [])

    function toggle(id, numero){
        const escolhido = cadeiras.has(id);
        if(escolhido){
            cadeiras.delete(id);
            setCadeiras(new Map(cadeiras));
        } else {
            setCadeiras(new Map(cadeiras.set(id, numero)));
        }
    }

    function renderizarLugares(){
        if (sessao !== null){
            return sessao.seats.map((seat) =>{
                const {id, name, isAvailable} = seat;
                const selecionado = cadeiras.has(id);
                return <Assento 
                key={id}
                id={id}
                numero={name}
                disponivel={isAvailable}
                selecionado={selecionado} 
                selecionar={(id, numero) => toggle(id, numero)}
                />
            })
        }
    }

    function confirmarCompra(event, cadeiras) {
        event.preventDefault();
        
        if(cadeiras.length > 0) {
          const promise = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
            ids: cadeiras.map((assento) => assento.id),
            name: compra.nome,
            cpf: compra.cpf
          });
          
          promise.then((resposta) => {
            finalizar({
              filme: sessao.movie.title,
              dia: sessao.day.date,
              horario: sessao.name,
              assentos: cadeiras,
              comprador: compra
            });
            navigate("/sucesso");
          });
          promise.catch(err => alert(err.response.statusText));
        } 
      }

    function renderizarLegendas() {
        return (
          <>
            <AssentoLegenda cor="#8DD7CF"><button></button><p>Selecionado</p></AssentoLegenda>
            <AssentoLegenda><button></button><p>Disponível</p></AssentoLegenda>
            <AssentoLegenda cor="#FBE192"><button></button><p>Indisponível</p></AssentoLegenda>
          </>
        )
      }

      function renderizarCompra() {
        return (
          <>
            <label htmlFor="nome">Nome do comprador:</label>
            <input type="text" id="nome" value={compra.nome} placeholder="Digite seu nome..." required
              onChange={(e) => setCompra({...compra, nome: e.target.value })}
            />
            <label htmlFor="cpf">CPF do comprador:</label>
            <input type="text" id="cpf" value={compra.cpf} placeholder="Digite seu CPF..." required
              onChange={(e) => setCompra({...compra, cpf: e.target.value })}
            />
            <div>
              <button>Reservar assento(s)</button>
            </div>
          </>
        )
      }

    const lugares = renderizarLugares();
    const legenda = renderizarLegendas();
    const formularioCompra = renderizarCompra();

    return(
       <Container>
           <h1>Selecione o(s) assento(s)</h1>
           <Lugares>{lugares}</Lugares>
           <Legenda>{legenda}</Legenda>
           <FormularioCompra onSubmit={confirmarCompra}>
            {formularioCompra}
            </FormularioCompra>
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

const Legenda = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

const AssentoLegenda = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #808F9D;
    background-color: ${({cor}) => cor || "#C3CFD9"};
  }

  p {
    font-size: 13px;
    margin-top: 5px;
  }
`
const FormularioCompra = styled.form`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
  margin-bottom: 200px;

  * {
    margin: 5px 0;
  }

  input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
  }

  button {
    background-color: var(--laranja);
    width: 225px;
    color: white;
    padding: 10px 5px;
    border: 0;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;