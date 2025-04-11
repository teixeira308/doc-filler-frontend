import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import useApiCategoriaPessoas from "../../services/apiCategoriaPessoas";

const CategoriaPessoa = () => {
  const { getCategoriasPessoa } = useApiCategoriaPessoas();

  const [categoriaPessoas, setCategoriaPessoas] = useState([]);
  

  const fetchCategorias = async () => {
    try {
      const data = await getCategoriasPessoa();
      setCategoriaPessoas(data);
      console.log(data)
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  
  return (
    <C.Container>
      <Navbar />
      <C.Title>
        Categorias
        <C.NewButton>
          <BsPlusCircle /> Nova Categoria
        </C.NewButton>
      </C.Title>

      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome</C.TableHeader>
            <C.TableHeader>Descrição</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {categoriaPessoas.map((categoria) => (
            <C.TableRow key={categoria.id}>
              <C.TableData>{categoria.nome}</C.TableData>
              <C.TableData>{categoria.descricao}</C.TableData>
              <C.TableData>
                <C.ActionButton >
                  <BsPencil /> Editar
                </C.ActionButton>
                <C.DeleteButton >
                  <BsTrash3 /> Excluir
                </C.DeleteButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
 
    </C.Container>
  );
};

export default CategoriaPessoa;
