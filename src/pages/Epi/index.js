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
import useApiEpi from "../../services/apiEpi";
import CreateEpiModal from "../../components/ModalCreateEpi/CreateEpiModal";
import EditarEpiModal from "../../components/ModalEditarEpi/EditarEpiModal";
import DeleteEpiModal from "../../components/ModalDeleteEpi/DeleteEpiModal";
import ImportarEPIModal from "../../components/ModalImportarEPI/ImportarEPIModal";

const Epi = () => {
  const { getEpis } = useApiEpi();
  const [epis, setEpis] = useState([]);
  const [filteredEpis, setFilteredEpis] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEpi, setSelectedEpi] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isImportarEPIModalOpen, setIsImportarEPIModalOpen] = useState(false);

  const fetchEpis = async () => {
    try {
      const data = await getEpis(currentPage);
      setEpis(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao carregar EPIs:", error);
    }
  };

  useEffect(() => {
    fetchEpis();
  }, [currentPage]);

  useEffect(() => {
    setFilteredEpis(
      epis.filter((epi) =>
        epi.nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, epis]);

  const handleNewEpiCreated = () => {
    fetchEpis();
  };

  const handleEpiUpdated = () => {
    fetchEpis();
    setIsEditModalOpen(false);
    setSelectedEpi(null);
  };

    const handleImportarPessoaModalClose = async () => {
      setIsImportarEPIModalOpen(false);
      fetchEpis();
    };

  const handleEpiDeleted = () => {
    fetchEpis();
    setIsDeleteModalOpen(false);
    setSelectedEpi(null);
  };
  const handleImportarEPIButtonClick = () => {
    setIsImportarEPIModalOpen(true);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>EPIs</C.Title>

      <C.SearchInput
        type="text"
        placeholder="Pesquisar por nome"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <C.ButtonGroup>
        <C.Button onClick={() => setIsCreateModalOpen(true)}>
          <BsPlusCircle /> Novo EPI
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
          {filteredEpis.map((epi) => (
            <C.TableRow key={epi.id}>
              <C.TableData>{epi.nome}</C.TableData>
              <C.TableData>{epi.descricao}</C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => { setSelectedEpi(epi); setIsEditModalOpen(true); }}>
                  <BsPencil /> Editar
                </C.ActionButton>
                <C.DeleteButton onClick={() => { setSelectedEpi(epi); setIsDeleteModalOpen(true); }}>
                  <BsTrash3 /> Excluir
                </C.DeleteButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>

      <CreateEpiModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleNewEpiCreated}
      />

      <EditarEpiModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        epi={selectedEpi}
        onEdit={handleEpiUpdated}
      />

      <DeleteEpiModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        epi={selectedEpi}
        onDelete={handleEpiDeleted}
      />
      <ImportarEPIModal
              isOpen={isImportarEPIModalOpen}
              onClose={handleImportarPessoaModalClose}
            />
    </C.Container>
  );
};

export default Epi;
