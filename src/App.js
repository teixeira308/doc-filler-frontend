import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";

const App = () => (
  <AuthProvider>
    <GlobalStyle />
    <BrowserRouter basename="/docfiller" >
      <RoutesApp />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
