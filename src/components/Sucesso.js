import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Container from "./Container";

export default function TelaSucesso(props) {
  
  const navigate = useNavigate();

  const {reserva, novaReserva} = props;
  const {filme, dia, horario, assentos, comprador} = reserva;

  function Home(){
    navigate("/");
  }

  return (
    <Container>
      <DadosConfirmacao>
        <h1>Pedido feito com sucesso!</h1>
        <Infos>
          <h1>Filme e sessão</h1>
          <p>{filme}</p>
          <p>{dia} {horario}</p>
        </Infos>
        <Infos>
          <h1>Ingressos</h1>
          {
            assentos.map(({numero}) => {
              return <p key={numero}>Assento {numero}</p>
            })
          }
        </Infos>
        <Infos>
          <h1>Comprador</h1>
          <p>Nome: {comprador.nome}</p>
          <p>CPF: {comprador.cpf}</p>
        </Infos>
      </DadosConfirmacao>
      <BotaoVoltar onClick={Home}>Voltar para home</BotaoVoltar>
    </Container>
  )
}

const DadosConfirmacao = styled.div`
  font-size: 22px;

  h1 {
    width: 370px;
    height: 60px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #247A6B;
    font-weight: 700;
  }
`;

const BotaoVoltar = styled.button`
  background-color: var(--laranja);
  width: 225px;
  color: white;
  padding: 10px 5px;
  border: 0;
  margin-top: 60px;
  cursor: pointer;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
  }
  p {
    line-height: 25px;
  }
`