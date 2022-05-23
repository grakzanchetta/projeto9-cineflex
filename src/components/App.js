import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./Header";
import Principal from "./Principal";
import Sessoes from "./Sessoes";
import Assentos from "./Assentos";
import Sucesso from "./Sucesso";



export default function App (){
    const [reserva, setReserva] = useState(null)

    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Principal />}/>
                <Route path="/sessoes/:idFilme" element={<Sessoes />}/>
                <Route path="/assentos/:idSessao" element={< Assentos finalizar={(reserva) => setReserva(reserva)}/>}/>
                <Route path="/sucesso" element={<Sucesso reserva={reserva}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
