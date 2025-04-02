import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Pessoas from "../pages/Pessoas";
import Templates from "../pages/Templates";
import Demonstracao from "../pages/Demonstracao";
import Suporte from "../pages/Suporte";
import Tutorial from "../pages/Tutorial";


const Private = ({ Item }) => {
  const { signed } = useAuth();
  
  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter basename='/'>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/pessoas" element={<Private Item={Pessoas} />} />
          <Route exact path="/templates" element={<Private Item={Templates} />} />
          <Route exact path="/demonstracao" element={<Private Item={Demonstracao} />} />
          <Route exact path="/suporte" element={<Private Item={Suporte} />} />
          <Route exact path="/tutorial" element={<Private Item={Tutorial} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
