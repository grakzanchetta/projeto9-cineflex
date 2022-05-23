import styled from "styled-components";

export default function Assento(props) {
  const {id, numero, disponivel, selecionado, selecionar} = props;
  
  function selecionarAssento() {
    if(!disponivel) alert("Esse assento não está disponível");
    else selecionar(id, numero);
  }
  
  return (
    <Posicao
      disponivel={disponivel} 
      selecionado={selecionado}
      onClick={selecionarAssento}
    >
      {numero}
    </Posicao>
  )
}

function corCadeira(selecionado, disponivel) {
  if(selecionado) return "#8DD7CF";
  else if(disponivel) return "#C3CFD9";
  else return "#FBE192"; 
}

const Posicao = styled.button`
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cor-header);
    border: 1px solid #black;
    border-radius: 13px;
    background-color: ${({selecionado, disponivel}) => corCadeira(selecionado, disponivel)};
    cursor: pointer;
    margin: 8px 4px;
    color: #222222;
`