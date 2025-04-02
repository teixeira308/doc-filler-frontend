import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import useApi from "../../services/apiTemplates";
import CreateTemplateModal from "../../components/ModalCreateTemplate/CreateTemplateModal";
import DeleteTemplateModal from "../../components/ModalDeleteTemplate/DeleteTemplateModal"; 
import EditarTemplateModal from "../../components/ModalEditarTemplate/EditarTemplateModal"; 
import GerarDocumentoMassivoModal from "../../components/ModalGerarDocumentoMassivo/GerarDocumentoMassivoModal";

const Templates = ()  => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGerarDocumentoMassivoModalOpen, setIsGerarDocumentoMassivoModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { getTemplates, deleteTemplate, downloadTemplate } = useApi();
  
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
        setFilteredTemplates(data); // Inicialize o filtro com todos os dados
      } catch (error) {
        console.error("Erro ao carregar templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    // Filtra a lista de templates com base na consulta de busca
    setFilteredTemplates(
      templates.filter((template) =>
        template.descricao.toLowerCase().includes(searchQuery.toLowerCase()) 
      )
    );
  }, [searchQuery, templates]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedTemplateId(null);
  };

  const handleNewTemplateCreated = async () => {
    const data = await getTemplates();
    setTemplates(data);
  };

  const handleDelete = async () => {
    try {
      if (selectedTemplateId) {
        await deleteTemplate(selectedTemplateId);
        setTemplates(templates.filter((template) => template.id !== selectedTemplateId));
      }
      handleDeleteModalClose();
    } catch (error) {
      console.error("Erro ao deletar template:", error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedTemplateId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleGerarDocumentoMassivoModalClose = () =>{
    setIsGerarDocumentoMassivoModalOpen(false);
    setSelectedTemplate(null)
  }

  const handleTemplateUpdated = async () => {
    const data = await getTemplates();
    setTemplates(data);
    handleEditModalClose();
  };

  const handleViewDetails = (template) => {
    setSelectedTemplate(template);
    setIsViewDetailsModalOpen(true);
  };

  const handleViewDetailsModalClose = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleDownloadTemplate = async (template) => {
    try {
        const response = await downloadTemplate(template.nome);
        const fileContent = response;
        //console.log(fileContent)
        generateAndDownloadDocx(fileContent,template.nome);
    } catch (error) {
        console.error("Erro ao gerar arquivo completado:", error);
    }
};

const generateAndDownloadDocx = (data, fileName) => {
  try {
    // Converta os dados em um Blob
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    //console.log(blob);
    // Crie um URL para o Blob
    const url = URL.createObjectURL(blob);

    // Crie um link ancorado para fazer o download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    // Libere o URL criado
    URL.revokeObjectURL(url);
    //console.log("Document created and downloaded successfully");
  } catch (error) {
    console.error("Error generating or downloading document:", error);
  }
};

  return (
    <C.Container>
      <Navbar />
      <C.Title>Templates</C.Title>
      <C.SearchInput 
        type="text" 
        placeholder="Pesquisar por descrição" 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      <C.Button onClick={handleCreateButtonClick}>Criar Novo Template</C.Button>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Descrição</C.TableHeader>
            <C.TableHeader>nome</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredTemplates.map((template) => (
            <C.TableRow key={template.id}>
              <C.TableData>{template.descricao}</C.TableData>
              <C.TableData>{template.nome}</C.TableData>
              <C.TableData>
                {new Date(template.createdAt).toLocaleDateString()}
              </C.TableData>
              <C.TableData>
                <C.ActionButton onClick={() => openEditModal(template)}>Editar</C.ActionButton>
               {/* <C.ActionButton onClick={() => handleViewDetails(template)}>Detalhes</C.ActionButton>*/}
                <C.DeleteButton onClick={() => openDeleteModal(template.id)}>Excluir</C.DeleteButton>
                <C.DetailsButton onClick={() => handleDownloadTemplate(template)}>Baixar Template</C.DetailsButton>
                <C.ActionButton onClick={() => handleDownloadTemplate(template)}>Gerar documentos em massa</C.ActionButton>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleNewTemplateCreated}
      />
     <DeleteTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
      />
       <EditarTemplateModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        template={selectedTemplate}
        onEdit={handleTemplateUpdated}
      />
       <GerarDocumentoMassivoModal
        isOpen={isGerarDocumentoMassivoModalOpen}
        onClose={handleGerarDocumentoMassivoModalClose}
        template={selectedTemplate}
      />
     {/*  <DetalhesTemplateModal
        isOpen={isViewDetailsModalOpen}
        onClose={handleViewDetailsModalClose}
        pessoa={selectedTemplate}
      />*/}
    </C.Container>
  );
};

export default Templates;