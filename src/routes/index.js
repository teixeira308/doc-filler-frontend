import { Fragment } from "react";
import {  Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Pessoas from "../pages/Pessoas";
import Templates from "../pages/Templates";
import Demonstracao from "../pages/Demonstracao";
import Suporte from "../pages/Suporte";
import Tutorial from "../pages/Tutorial";
import Grupo from "../pages/Grupo";
import GrupoEpi from "../pages/GrupoEpi";
import Epi from "../pages/Epi"
import CriarPessoaPage from '../pages/CriarPessoa';
import EditarPessoaPage from '../pages/EditarPessoa';
import DetalhePessoaPage from '../pages/DetalhePessoa';
import GerarDocumentoMassivo from '../pages/GerarDocumentoMassivo';
import Documentos from '../pages/DocumentosGerados'
import EscolherDocumentoMassivo from '../pages/EscolherDocumentoMassivo'


const Private = ({ Item }) => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Pode substituir por um spinner
  }

  return signed ? <Item /> : <Signin />;
};


const RoutesApp = () => {
  return (
   
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/pessoas" element={<Private Item={Pessoas} />} />
          <Route exact path="/templates" element={<Private Item={Templates} />} />
          <Route exact path="/demonstracao" element={<Private Item={Demonstracao} />} />
          <Route exact path="/suporte" element={<Private Item={Suporte} />} />
          <Route exact path="/tutorial" element={<Private Item={Tutorial} />} />
          <Route exact path="/grupo" element={<Private Item={Grupo} />} />
          <Route exact path="/epi" element={<Private Item={Epi} />} />
          <Route exact path="/grupo-epi" element={<Private Item={GrupoEpi} />} />
          <Route exact path="/documentos" element={<Private Item={Documentos} />} />
          <Route path="/pessoas/novo" element={<CriarPessoaPage />} />
          <Route path="/pessoas/editar/:idPessoa" element={<EditarPessoaPage />} />
          <Route path="/pessoas/detalhes/:idPessoa" element={<DetalhePessoaPage />} />
          <Route path="/template/gerar/:idTemplate" element={<GerarDocumentoMassivo />} />
           <Route path="/template/gerar/" element={<EscolherDocumentoMassivo />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
   
  );
};

export default RoutesApp;
