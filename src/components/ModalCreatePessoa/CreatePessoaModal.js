// src/components/Modal/CreatePessoaModal.js

import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";

const CreatePessoaModal = ({ isOpen, onClose, onCreate }) => {
  const { createPessoa } = useApi();
  const { getGruposPessoa } = useApiGrupo();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGruposPessoa();
        setGrupos(data.data);
      } catch (error) {
        console.error("Erro ao carregar grupos: ", error);
      }
    };
    fetchGrupos();
  }, []); // Atualiza quando `currentPage` muda


  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
    numeroCarteiraTrabalho: "",
    email: "",
    dataAdmissao: "",
    nomeMae: "",
    nomePai: "",
    endereco: "",
    telefone: "",
    estadoCivil: "",
    funcao: "",
    genero: "",
    celular: "",
    data_treinamento_formacao_nr10: "",
    data_treinamento_reciclagem_nr10: "",
    data_treinamento_reciclagem_sep: "",
    data_treinamento_formacao_sep: "",
    data_validade_documento: "",
    coordenador_responsavel: "",
    data_aso: "",
    data_treinamento_nr35: "",
    ehs_responsavel: "",
    grupoId: ""
  });

  const resetFormData = () => {
    setFormData({
      nome: "",
      cpf: "",
      rg: "",
      grupoId: "",
      dataNascimento: "",
      numeroCarteiraTrabalho: "",
      email: "",
      dataAdmissao: "",
      nomeMae: "",
      nomePai: "",
      endereco: "",
      telefone: "",
      estadoCivil: "",
      funcao: "",
      genero: "",
      celular: "",
      data_treinamento_formacao_nr10: "",
      data_treinamento_reciclagem_nr10: "",
      data_treinamento_reciclagem_sep: "",
      data_treinamento_formacao_sep: "",
      data_validade_documento: "",
      coordenador_responsavel: "",
      data_aso: "",
      data_treinamento_nr35: "",
      ehs_responsavel: ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleClose = () => {
    onClose();
    resetFormData(); // Adicione isso para limpar o formulário
  };

  const [expandedSections, setExpandedSections] = useState({
    treinamentos: false,
    contato: false,
    responsaveis: false,
    documentos: false,
    pessoais: false
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPessoa(formData);
      onCreate();
      handleClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Criar Nova Pessoa</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nome">Nome</C.Label>
              <C.Input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="grupoId">Grupo</C.Label>
              <C.Select
                name="grupoId"
                id="grupoId"
                value={formData.grupoId || ""}
                onChange={handleChange}
              >
                <option value="">Selecione um grupo</option>
                {grupos.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.nome}
                  </option>
                ))}
              </C.Select>
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="funcao">Função</C.Label>
              <C.Input
                type="text"
                name="funcao"
                id="funcao"
                value={formData.funcao}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("pessoais")}>
              Dados pessoais
            </C.SectionTitle>

            {expandedSections.pessoais && (
              <>
                <C.SectionContent>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="cpf">CPF</C.Label>
                      <C.Input
                        type="text"
                        name="cpf"
                        id="cpf"
                        value={formData.cpf}
                        onChange={handleChange}

                      />
                    </C.FormColumn>

                    <C.FormColumn>
                      <C.Label htmlFor="rg">RG</C.Label>
                      <C.Input
                        type="text"
                        name="rg"
                        id="rg"
                        value={formData.rg}
                        onChange={handleChange}

                      />
                    </C.FormColumn>

                  </C.FormRow>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="dataNascimento">Data de Nascimento</C.Label>
                      <C.Input
                        type="text"
                        name="dataNascimento"
                        id="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}

                      />
                    </C.FormColumn>
                    <C.FormRow>
                      <C.FormColumn>
                        <C.Label htmlFor="estadoCivil">Estado Civil</C.Label>
                        <C.Input
                          type="text"
                          name="estadoCivil"
                          id="estadoCivil"
                          value={formData.estadoCivil}
                          onChange={handleChange}

                        />
                      </C.FormColumn>
                      <C.FormColumn>
                        <C.Label htmlFor="genero">Gênero</C.Label>
                        <C.Input
                          type="text"
                          name="genero"
                          id="genero"
                          value={formData.genero}
                          onChange={handleChange}

                        />
                      </C.FormColumn>
                    </C.FormRow>
                  </C.FormRow>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="nomeMae">Nome da Mãe</C.Label>
                      <C.Input
                        type="text"
                        name="nomeMae"
                        id="nomeMae"
                        value={formData.nomeMae}
                        onChange={handleChange}

                      />
                    </C.FormColumn>



                    <C.FormColumn>
                      <C.Label htmlFor="nomePai">Nome do Pai</C.Label>
                      <C.Input
                        type="text"
                        name="nomePai"
                        id="nomePai"
                        value={formData.nomePai}
                        onChange={handleChange}

                      />
                    </C.FormColumn>

                  </C.FormRow>



                  <C.FormRow>


                  </C.FormRow>
                </C.SectionContent>
              </>)}
          </C.Section>
          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("contato")}>
              Contato
            </C.SectionTitle>

            {expandedSections.contato && (
              <>
                <C.SectionContent>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="email">E-mail</C.Label>
                      <C.Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}

                      />
                    </C.FormColumn>
                  </C.FormRow>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="telefone">Telefone</C.Label>
                      <C.Input
                        type="text"
                        name="telefone"
                        id="telefone"
                        value={formData.telefone}
                        onChange={handleChange}

                      />
                    </C.FormColumn>
                    <C.FormColumn>
                      <C.Label htmlFor="celular">Celular</C.Label>
                      <C.Input
                        type="text"
                        name="celular"
                        id="celular"
                        value={formData.celular}
                        onChange={handleChange}

                      />
                    </C.FormColumn>
                  </C.FormRow>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="endereco">Endereço</C.Label>
                      <C.Input
                        type="text"
                        name="endereco"
                        id="endereco"
                        value={formData.endereco}
                        onChange={handleChange}

                      />
                    </C.FormColumn>
                  </C.FormRow>
                </C.SectionContent>
              </>
            )}

          </C.Section>
          <C.Section>

            {/* Treinamentos */}
            <C.SectionTitle onClick={() => toggleSection("documentos")}>
              Documentos e Contratação
            </C.SectionTitle>
            {expandedSections.documentos && (
              <C.SectionContent>
                <C.FormRow>
                  <C.FormColumn>
                    <C.Label htmlFor="numeroCarteiraTrabalho">
                      Número da Carteira de Trabalho
                    </C.Label>
                    <C.Input
                      type="text"
                      name="numeroCarteiraTrabalho"
                      id="numeroCarteiraTrabalho"
                      value={formData.numeroCarteiraTrabalho}
                      onChange={handleChange}

                    />
                  </C.FormColumn>
                 
                  <C.FormColumn>
                    <C.Label htmlFor="dataAdmissao">Data de Admissão</C.Label>
                    <C.Input
                      type="text"
                      name="dataAdmissao"
                      id="dataAdmissao"
                      value={formData.dataAdmissao}
                      onChange={handleChange}

                    />
                  </C.FormColumn>
                  </C.FormRow>
                  <C.FormRow>
                  <C.FormColumn>
                    <C.Label htmlFor="data_validade_documento">Validade Documento</C.Label>
                    <C.Input
                      type="text"
                      name="data_validade_documento"
                      value={formData.data_validade_documento}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                  <C.FormColumn>
                    <C.Label htmlFor="data_aso">Data ASO</C.Label>
                    <C.Input
                      type="text"
                      name="data_aso"
                      value={formData.data_aso}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                </C.FormRow>


              </C.SectionContent>)}

          </C.Section>
          <C.Section>
            {/* Treinamentos */}
            <C.SectionTitle onClick={() => toggleSection("treinamentos")}>
              Treinamentos
            </C.SectionTitle>

            {expandedSections.treinamentos && (
              <C.SectionContent>
                <C.FormRow>
                  <C.FormColumn>
                    <C.Label htmlFor="data_treinamento_formacao_nr10">Treinamento Formação NR10</C.Label>
                    <C.Input
                      type="text"
                      name="data_treinamento_formacao_nr10"
                      value={formData.data_treinamento_formacao_nr10}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                  <C.FormColumn>
                    <C.Label htmlFor="data_treinamento_reciclagem_nr10">Reciclagem NR10</C.Label>
                    <C.Input
                      type="text"
                      name="data_treinamento_reciclagem_nr10"
                      value={formData.data_treinamento_reciclagem_nr10}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                </C.FormRow>

                <C.FormRow>
                  <C.FormColumn>
                    <C.Label htmlFor="data_treinamento_formacao_sep">Treinamento Formação SEP</C.Label>
                    <C.Input
                      type="text"
                      name="data_treinamento_formacao_sep"
                      value={formData.data_treinamento_formacao_sep}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                  <C.FormColumn>
                    <C.Label htmlFor="data_treinamento_reciclagem_sep">Reciclagem SEP</C.Label>
                    <C.Input
                      type="text"
                      name="data_treinamento_reciclagem_sep"
                      value={formData.data_treinamento_reciclagem_sep}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                </C.FormRow>

                <C.FormRow>
                  <C.FormColumn>
                    <C.Label htmlFor="data_treinamento_nr35">Treinamento NR35</C.Label>
                    <C.Input
                      type="text"
                      name="data_treinamento_nr35"
                      value={formData.data_treinamento_nr35}
                      onChange={handleChange}
                    />
                  </C.FormColumn>
                </C.FormRow>
              </C.SectionContent>
            )}
          </C.Section>
          <C.Section>
            {/* Documentos */}
            <C.SectionTitle onClick={() => toggleSection("responsaveis")}>
              Responsáveis
            </C.SectionTitle>

            {expandedSections.responsaveis && (
              <>
                <C.SectionContent>
                  <C.FormRow>

                    <C.FormColumn>
                      <C.Label htmlFor="coordenador_responsavel">Coordenador Responsável</C.Label>
                      <C.Input
                        type="text"
                        name="coordenador_responsavel"
                        value={formData.coordenador_responsavel}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>

                  <C.FormRow>

                    <C.FormColumn>
                      <C.Label htmlFor="ehs_responsavel">EHS Responsável</C.Label>
                      <C.Input
                        type="text"
                        name="ehs_responsavel"
                        value={formData.ehs_responsavel}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>
                </C.SectionContent>
              </>
            )}
          </C.Section>
          <C.Button type="submit">Salvar</C.Button>

        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay >
  );
};

export default CreatePessoaModal;
