import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import useApi from "../../services/api";
import CreatePessoaModal from "../../components/ModalCreatePessoa/CreatePessoaModal";
import DeletePessoaModal from "../../components/ModalDeletePessoa/DeletePessoaModal";
import EditPessoaModal from "../../components/ModalEditarPessoa/EditarPessoaModal";
import DetalhesPessoaModal from "../../components/ModalDetalhesPessoa/DetalhesPessoaModal";
import GerarDocumentoPessoaModal from "../../components/ModalGerarDocumentoPessoa/GerarDocumentoPessoaModal";
import { BsPencil, BsTrash3, BsZoomIn, BsCardChecklist, BsPlusCircle,BsFillCaretLeftFill,BsFillCaretRightFill ,BsUpload} from "react-icons/bs";
import ImportarPessoaModal from "../../components/ModalImportarPessoa/ImportarPessoaModal";

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [filteredPessoas, setFilteredPessoas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportarPessoaModalOpen, setIsImportarPessoaModalOpen] = useState(false);
  const [isGenerateFileModalOpen, setIsGenerateFileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedPessoaId, setSelectedPessoaId] = useState(null);
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const { getPessoas, deletePessoa } = useApi();

  //paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Número de itens por página


  //Use effect
  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const data = await getPessoas(currentPage);
        setPessoas(data.data);
        setFilteredPessoas(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao carregar pessoas:", error);
      }
    };
    fetchPessoas();
  }, [currentPage]); // Atualiza quando `currentPage` muda


  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredPessoas(
      pessoas.filter((pessoa) =>
        pessoa.nome.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pessoas]);

  //Handle actions

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleNewPessoaCreated = async () => {
    const data = await getPessoas();
    setPessoas(data.data);
  };

  const handleDelete = async () => {
    try {
      if (selectedPessoaId) {
        await deletePessoa(selectedPessoaId);
        setPessoas(pessoas.filter((pessoa) => pessoa.id !== selectedPessoaId));
      }
      handleDeleteModalClose();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };



  //Open Modal

  const openDeleteModal = (id) => {
    setSelectedPessoaId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (pessoa) => {
    setSelectedPessoa(pessoa);
    setIsEditModalOpen(true);
  };

  const openGenerateFileModal = (pessoa) => {
    setSelectedPessoa(pessoa);
    setIsGenerateFileModalOpen(true);
  };


  const handlePessoaUpdated = async () => {
    const data = await getPessoas();
    setPessoas(data.data);
    handleEditModalClose();
  };

  const handleViewDetails = (pessoa) => {
    setSelectedPessoa(pessoa);
    setIsViewDetailsModalOpen(true);
  };

  //Handle close modal
  const handleViewDetailsModalClose = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedPessoa(null);
  };

  const handleImportarPessoaModalClose = async () => {
    setIsImportarPessoaModalOpen(false);
    const data = await getPessoas();
    setPessoas(data.data);
  };

  const handleGenerateFileModalClose = () => {
    setIsGenerateFileModalOpen(false);
    setSelectedPessoa(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPessoa(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedPessoaId(null);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Pessoas</C.Title>
      <C.SearchInput
        type="text"
        placeholder="Pesquisar por nome"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <C.Button onClick={handleCreateButtonClick}><BsPlusCircle /> Pessoa</C.Button>
      <C.Button onClick={handleCreateButtonClick}><BsUpload /> Importar Excel(.xlsx)</C.Button>
      <C.PaginationContainer>
        <C.PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <BsFillCaretLeftFill/>
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
            <C.TableHeader>CPF</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredPessoas.map((pessoa) => (
            <C.TableRow key={pessoa.id}>
              <C.TableData>{pessoa.nome}</C.TableData>
              <C.TableData>{pessoa.cpf}</C.TableData>
              <C.TableData>
                {new Date(pessoa.createdAt).toLocaleDateString()}
              </C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => openEditModal(pessoa)}><BsPencil /> Editar</C.ActionButton>
                <C.DetailsButton onClick={() => handleViewDetails(pessoa)}><BsZoomIn /> Detalhes</C.DetailsButton>
                <C.DeleteButton onClick={() => openDeleteModal(pessoa.id)}><BsTrash3 /> Excluir</C.DeleteButton>
                <C.ActionButton onClick={() => openGenerateFileModal(pessoa)}><BsCardChecklist /> Gerar documento</C.ActionButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      <CreatePessoaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleNewPessoaCreated}
      />
      <DeletePessoaModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
      />
      <EditPessoaModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        pessoa={selectedPessoa}
        onEdit={handlePessoaUpdated}
      />
      <DetalhesPessoaModal
        isOpen={isViewDetailsModalOpen}
        onClose={handleViewDetailsModalClose}
        pessoa={selectedPessoa}
      />
      <GerarDocumentoPessoaModal
        isOpen={isGenerateFileModalOpen}
        onClose={handleGenerateFileModalClose}
        pessoa={selectedPessoa}
      />
      <ImportarPessoaModal
        isOpen={isImportarPessoaModalOpen}
        onClose={handleImportarPessoaModalClose}
      />
    </C.Container>
  );
};

export default Pessoas;
