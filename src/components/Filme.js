import { Link } from "react-router-dom"
import styled from "styled-components";

export default function Filme (props){

    return (
        <Link to={`/sessoes/${props.id}`}>
            <Poster>
                <img src={props.poster} alt={"poster"}/>
            </Poster>
        </Link>
        )
}

const Poster = styled.div`
padding: 8px;
background-color: #FFFFFF;
box-shadow: 0px 2px 4px 2px #0000001A;
border-radius: 3px;
margin: 5.5px 15px;
width: 145px;
height: 209px;

img {
  height: 193px;
  width: 129px;
}
`