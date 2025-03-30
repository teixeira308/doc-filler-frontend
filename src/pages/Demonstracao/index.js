import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Demonstracao = () => {
  return (
    <C.Container>
      <Navbar />
      <C.Title>Demonstração</C.Title>
      <p>Veja no vídeo como utilizar o Doc Filler para agilizar seus processos.</p>
      <iframe width="300" height="500" src="https://www.youtube.com/embed/tJI8UGll-d0?si=UFsEPXHaLqRInQsz"
        title="Demonstração Doc Filler Web" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </C.Container>
  )
};

export default Demonstracao;