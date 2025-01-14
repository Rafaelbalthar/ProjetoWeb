import React from 'react';

//importa 3 objetos da lib 
import { Route, Routes, BrowserRouter } from 'react-router-dom';
 
//Importa a página Home
import Home from '../paginas/Home';

//Importa a página Cadastro
import Cadastro from '../paginas/Cadastro';
import ListaRegistros from '../paginas/ListaRegistros';
import EditarRegistro from '../paginas/EditarRegistro';
import Login from  '../paginas/Login';
import { AuthProvider } from '../autenticacao/autenticacao';
import PrivateRoute from '../autenticacao/rotasPrivadas';
 
function Rotas() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>   

                <Route path="/lista" element={<PrivateRoute />}>
                    <Route path="/lista" element={<ListaRegistros />} />
                </Route>
                <Route path="/editar/:id" element={<PrivateRoute />}>
                    <Route path="/editar/:id" element={<EditarRegistro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    )
}
export default Rotas;