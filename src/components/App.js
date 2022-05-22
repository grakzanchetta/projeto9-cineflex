import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Principal from "./Principal";
import Sessoes from "./Sessoes";
import Assentos from "./Assentos";
import Sucesso from "./Sucesso";

export default function App (){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Principal />}/>
                <Route path="/sessoes/:idFilme" element={<Sessoes />}/>
                <Route path="/assentos/:idSessao" element={< Assentos />}/>
                <Route path="/sucesso" element={<Sucesso />}/>
            </Routes>
        </BrowserRouter>
    )
}
