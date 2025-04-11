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
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
   
  );
};

export default RoutesApp;
