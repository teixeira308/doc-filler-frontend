import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";
import {  BsCardChecklist } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useEpiApi from "../../services/apiEpi";
import useApiGrupoEpi from "../../services/apiGrupoEpi";

const GerarDocumentoMassivoModal = () => {

  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const { getTemplates, deleteTemplate, downloadTemplate } = useApi();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca

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

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <C.PageContainer>
      <Navbar />
      <C.PageHeader>
        <Navbar />
        <h2>Gerar documentos massivamente</h2>
        <C.BackButton onClick={handleBack}>
          <FaArrowLeft />
          Voltar
        </C.BackButton>
      </C.PageHeader>

      <C.FormContainer>
        <C.SearchInput
          type="text"
          placeholder="Pesquisar por descrição"
          value={searchQuery}
          onChange={handleSearchChange}
        />
<C.Table>
        <thead>
          <tr>
            <C.TableHeader>Nome ao gerar</C.TableHeader>
            <C.TableHeader>Nome do arquivo</C.TableHeader>
            <C.TableHeader>Tipo</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
            <C.TableHeader>Ações</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredTemplates.map((template) => (
            <C.TableRow key={template.id}>
              <C.TableData>{template.descricao}</C.TableData>
              <C.TableData>{template.nome}</C.TableData>
              <C.TableData>{template.tipoTemplate}</C.TableData>
              <C.TableData>
                {new Date(template.createdAt).toLocaleDateString()}
              </C.TableData>
              <C.TableData>
                <C.ActionsWrapper>
                  <C.ActionButton onClick={() => navigate(`/template/gerar/${template.id}`)}><BsCardChecklist /> Gerar documentos em massa</C.ActionButton>
                </C.ActionsWrapper>
              </C.TableData>
            </C.TableRow>
          ))}
        </tbody>
      </C.Table>
      </C.FormContainer>

    </C.PageContainer >
  );
};

export default GerarDocumentoMassivoModal;
