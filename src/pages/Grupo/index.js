import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle
} from "react-icons/bs";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";

const Grupo = () => {
  const { getGruposPessoa } = useApigrupoPessoas();

  const [grupoPessoas, setgrupoPessoas] = useState([]);


  const fetchgrupos = async () => {
    try {
      const data = await getGruposPessoa();
      setgrupoPessoas(data);
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
    }
  };

  useEffect(() => {
    fetchgrupos();
  }, []);


  return (
    <C.Container>
      <Navbar />
      <C.Title>
        Grupo

      </C.Title>
      <C.ButtonGroup>
        <C.NewButton>
          <BsPlusCircle /> Novo Grupo
        </C.NewButton>
      </C.ButtonGroup>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome</C.TableHeader>
            <C.TableHeader>Descrição</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {grupoPessoas.map((grupo) => (
            <C.TableRow key={grupo.id}>
              <C.TableData>{grupo.nome}</C.TableData>
              <C.TableData>{grupo.descricao}</C.TableData>
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

  {/* Modais
     
      <CreateGrupoPessoaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleNewgrupoCreated}
      />
     
      <EditgrupoPessoaModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        grupo={selectedgrupo}
        onEdit={handlegrupoUpdated}
      />
      <DeletegrupoPessoaModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        grupo={selectedgrupo}
      />
       */}
    </C.Container>
  );
};

export default Grupo;
