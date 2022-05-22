import styled from "styled-components";

export default function Header (){
    return (
        <Cineflex>
            <h1>CINEFLEX</h1>
        </Cineflex>
    )
}

const Cineflex = styled.div`
    background-color: var(--cor-header);
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;

h1 {
    font-size: 34px;
    color: var(--laranja);
  }
`