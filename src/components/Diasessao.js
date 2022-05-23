import { Link} from "react-router-dom";
import styled from "styled-components";

export default function Diasessao(props){
 
    const {dia, data, sessoes} = props
    function renderizarSessoes (){

        return sessoes.map(sessao => {
            const {id, name} = sessao;
            return (<Link key={sessao.id} to={`/assentos/${id}`}>
            <button>{name}</button>
            </Link>)
        })
    }
 
    const sessaoRenderizada = renderizarSessoes();
 
    return (
        <Container>
          <p>{dia} - {data}</p>
          {sessaoRenderizada}
        </Container>
      )  
}

const Container = styled.div`
  min-width: 375px;
  max-width: 500px;
  margin: 10px 0;

  p {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    font-size: 20px;
  }

  button {
    font-size: 18px;
    background-color: var(--laranja);
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 15px 20px;
    margin-right: 10px;
    cursor: pointer;
  }
`;