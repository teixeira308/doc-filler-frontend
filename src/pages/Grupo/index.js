import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle,
  BsFillCaretLeftFill, 
  BsFillCaretRightFill
} from "react-icons/bs";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";
import CreateGrupoPessoaModal from "../../components/ModalCreateGrupo/CreateGrupoModal";
import EditarGrupoModal from "../../components/ModalEditarGrupo/EditarGrupoModal";
import DeleteGrupoModal from "../../components/ModalDeleteGrupo/DeleteGrupoModal";

const Grupo = () => {
  const { getGruposPessoa } = useApigrupoPessoas();
  const [filteredGrupos, setFilteredGrupos] = useState([]);
  const [grupoPessoas, setgrupoPessoas] = useState([]);
  const [isCreateGrupoPessoaModalOpen, setIsCreateGrupoPessoaModalOpen] = useState(false)
  const [isEditarGrupoModalOpen, setIsEditarGrupoModalOpen] = useState(false)
  const [isDeleteGrupoModalOpen, setIsDeleteGrupoModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
    //paginacao
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
   
  

    const fetchgrupos = async () => {
      try {
        const data = await getGruposPessoa(currentPage);
        setgrupoPessoas(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao carregar grupos:", error);
      }
    };

  const handleNewGrupoCreated = async () => {
    fetchgrupos();
  };

  const handlegrupoUpdated = async () => {
    fetchgrupos();
    setIsEditarGrupoModalOpen(false)
    setSelectedGrupo(null)
  }
  
  const handlegrupoDeleted = async() =>{
    fetchgrupos();
    setIsDeleteGrupoModalOpen(false)
    setSelectedGrupo(null)
  }

  const openEditGrupoModal = async (grupo) => {
    setSelectedGrupo(grupo)
    setIsEditarGrupoModalOpen(true)
  }

  const openDeleteGrupoModal = async (grupo) =>{
    setSelectedGrupo(grupo);
    setIsDeleteGrupoModalOpen(true)
  }

  useEffect(() => {
    
    fetchgrupos();
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredGrupos(
      grupoPessoas.filter((grupo) =>
        grupo.nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, grupoPessoas]);

  return (
    <C.Container>
      <Navbar />
      <C.Title>
        Grupo

      </C.Title>
       <C.SearchInput
              type="text"
              placeholder="Pesquisar por nome"
              value={searchQuery}
              onChange={handleSearchChange}
            />
      <C.ButtonGroup>
        <C.Button onClick={() => setIsCreateGrupoPessoaModalOpen(true)}>
          <BsPlusCircle /> Novo Grupo
        </C.Button>
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
          {filteredGrupos.map((grupo) => (
            <C.TableRow key={grupo.id}>
              <C.TableData>{grupo.nome}</C.TableData>
              <C.TableData>{grupo.descricao}</C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => openEditGrupoModal(grupo)}>
                  <BsPencil /> Editar
                </C.ActionButton>
                <C.DeleteButton onClick={() => openDeleteGrupoModal(grupo)}>
                  <BsTrash3 /> Excluir
                </C.DeleteButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      <C.PaginationContainer>
              <C.PageButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <BsFillCaretLeftFill />
              </C.PageButton>
      
              <span>Página {currentPage} de {totalPages}</span>
      
              <C.PageButton
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <BsFillCaretRightFill />
              </C.PageButton>
            </C.PaginationContainer>


      <CreateGrupoPessoaModal
        isOpen={isCreateGrupoPessoaModalOpen}
        onClose={() => setIsCreateGrupoPessoaModalOpen(false)}
        onCreate={handleNewGrupoCreated}
      />


      <EditarGrupoModal
        isOpen={isEditarGrupoModalOpen}
        onClose={() => setIsEditarGrupoModalOpen(false)}
        grupo={selectedGrupo}
        onEdit={handlegrupoUpdated}
      />
      
      <DeleteGrupoModal
        isOpen={isDeleteGrupoModalOpen}
        onClose={() => setIsDeleteGrupoModalOpen(false)}
        onDelete={handlegrupoDeleted}
        grupo={selectedGrupo}
      />
       
    </C.Container>
  );
};

export default Grupo;
