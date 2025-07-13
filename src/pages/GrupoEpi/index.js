// src/pages/Epi/Epi.js
import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsUpload
} from "react-icons/bs";
import useApiGrupoEpi from "../../services/apiGrupoEpi";
import CreateGrupoEpiModal from "../../components/ModalCreateGrupoEpi/CreateGrupoEpiModal";
import EditarGrupoEpiModal from "../../components/ModalEditarGrupoEpi/EditarGrupoEpiModal";
import DeleteGrupoEpiModal from "../../components/ModalDeleteGrupoEpi/DeleteGrupoEpiModal";
import ImportarGrupoEPIModal from "../../components/ModalImportarGrupoEPI/ImportarGrupoEPIModal";

const Epi = () => {
  const { getGrupoEpis } = useApiGrupoEpi();
  const [grupoEpis, setGrupogrupoEpis] = useState([]);
  const [filteredgrupoEpis, setFilteredgrupoEpis] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEpi, setSelectedEpi] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isImportarEPIModalOpen, setIsImportarEPIModalOpen] = useState(false);

  const fetchgrupoEpis = async () => {
    try {
      const data = await getGrupoEpis(currentPage);
      setGrupogrupoEpis(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao carregar Grupo grupoEpis:", error);
    }
  };

  useEffect(() => {
    fetchgrupoEpis();
  }, [currentPage]);

  useEffect(() => {
    setFilteredgrupoEpis(
      grupoEpis.filter((epi) =>
        epi.nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, grupoEpis]);

  const handleNewEpiCreated = () => {
    fetchgrupoEpis();
  };

  const handleEpiUpdated = () => {
    fetchgrupoEpis();
    setIsEditModalOpen(false);
    setSelectedEpi(null);
  };

    const handleImportarPessoaModalClose = async () => {
      setIsImportarEPIModalOpen(false);
      fetchgrupoEpis();
    };

  const handleEpiDeleted = () => {
    fetchgrupoEpis();
    setIsDeleteModalOpen(false);
    setSelectedEpi(null);
  };
  const handleImportarEPIButtonClick = () => {
    setIsImportarEPIModalOpen(true);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Grupo EPI</C.Title>

      <C.SearchInput
        type="text"
        placeholder="Pesquisar por nome"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <C.ButtonGroup>
        <C.Button onClick={() => setIsCreateModalOpen(true)}>
          <BsPlusCircle /> Novo Grupo EPI
        </C.Button>
        <C.ButtonImport onClick={handleImportarEPIButtonClick}>
          <BsUpload /> Importar Excel(.xlsx)
        </C.ButtonImport>
      </C.ButtonGroup>

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

      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome</C.TableHeader>
            <C.TableHeader>Descrição</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredgrupoEpis.map((grupoepi) => (
            <C.TableRow key={grupoepi.id}>
              <C.TableData>{grupoepi.nome}</C.TableData>
              <C.TableData>{grupoepi.descricao}</C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => { setSelectedEpi(grupoepi); setIsEditModalOpen(true); }}>
                  <BsPencil /> Editar
                </C.ActionButton>
                <C.DeleteButton onClick={() => { setSelectedEpi(grupoepi); setIsDeleteModalOpen(true); }}>
                  <BsTrash3 /> Excluir
                </C.DeleteButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>

      <CreateGrupoEpiModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleNewEpiCreated}
      />

      <EditarGrupoEpiModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        epi={selectedEpi}
        onEdit={handleEpiUpdated}
      />

      <DeleteGrupoEpiModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        epi={selectedEpi}
        onDelete={handleEpiDeleted}
      />
      <ImportarGrupoEPIModal
              isOpen={isImportarEPIModalOpen}
              onClose={handleImportarPessoaModalClose}
            />
    </C.Container>
  );
};

export default Epi;
