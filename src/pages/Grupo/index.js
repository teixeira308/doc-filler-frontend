import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle
} from "react-icons/bs";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";
import CreateGrupoPessoaModal from "../../components/ModalCreateGrupo/CreateGrupoModal";

const Grupo = () => {
  const { getGruposPessoa } = useApigrupoPessoas();

  const [grupoPessoas, setgrupoPessoas] = useState([]);
  const [isCreateGrupoPessoaModalOpen, setIsCreateGrupoPessoaModalOpen] = useState(false)

  const fetchgrupos = async () => {
    try {
      const data = await getGruposPessoa();
      setgrupoPessoas(data);
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
    }
  };

  const handleNewGrupoCreated = async () => {
    fetchgrupos();
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
          <BsPlusCircle onClick={()=> setIsCreateGrupoPessoaModalOpen(true)} /> Novo Grupo
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

 
     
      <CreateGrupoPessoaModal
        isOpen={isCreateGrupoPessoaModalOpen}
        onClose={() => setIsCreateGrupoPessoaModalOpen(false)}
        onCreate={handleNewGrupoCreated}
      />
       {/* Modais
     
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
