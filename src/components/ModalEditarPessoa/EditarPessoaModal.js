import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";

const EditPessoaModal = ({ isOpen, onClose, pessoa, onEdit }) => {
  const { updatePessoa } = useApi();

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

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      "nome",
      "cpf",
      "rg",
      "dataNascimento",
      "numeroCarteiraTrabalho",
      "email",
      "dataAdmissao",
      "nomeMae",
      "nomePai",
      "endereco",
      "telefone",
      "estadoCivil",
      "funcao",
      "genero",
      "celular",
      "data_treinamento_formacao_nr10",
      "data_treinamento_reciclagem_nr10",
      "data_treinamento_reciclagem_sep",
      "data_treinamento_formacao_sep",
      "data_validade_documento",
      "coordenador_responsavel",
      "data_aso",
      "data_treinamento_nr35",
      "ehs_responsavel",
      "grupoId"
    ];


    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };


  useEffect(() => {
    if (pessoa) {
      setFormData(pessoa);
    }
  }, [pessoa]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updatePessoa(pessoa.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar pessoa:", error);
    }
  };

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (event, sectionName) => {
    event.stopPropagation();
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Pessoa</h2>
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
              <C.Label htmlFor="funcao">Função</C.Label>
              <C.Input
                type="text"
                name="funcao"
                id="funcao"
                value={formData.funcao}
                onChange={handleChange}
              />
            </C.FormColumn>
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
          </C.FormRow>
          <C.Section>
            <C.SectionTitle type="button" onClick={(e) => toggleSection(e, "pessoais")}>
              Dados pessoais
            </C.SectionTitle>

            {openSection === "pessoais" && (
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
            <C.SectionTitle type="button" onClick={(e) => toggleSection(e, "contato")}>
              Contato
            </C.SectionTitle>
            {openSection === "contato" && (
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
              </>)}

          </C.Section>



          <C.Section>
            <C.SectionTitle type="button" onClick={(e) => toggleSection(e, "documentos")}>
              Documentos e Contratação
            </C.SectionTitle>

            {openSection === "documentos" && (
              <>
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
                      <C.Label htmlFor="data_aso">Data do ASO</C.Label>
                      <C.Input
                        type="text"
                        name="data_aso"
                        id="data_aso"
                        value={formData.data_aso}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                    <C.FormColumn>
                      <C.Label htmlFor="data_validade_documento">Validade do Documento</C.Label>
                      <C.Input
                        type="text"
                        name="data_validade_documento"
                        id="data_validade_documento"
                        value={formData.data_validade_documento}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>
                </C.SectionContent>
              </>
            )}
          </C.Section>

          <C.Section>

            <C.SectionToggle type="button" onClick={(e) => toggleSection(e, "treinamentos")}>
              Treinamentos
            </C.SectionToggle>

            {openSection === "treinamentos" && (
              <>
                <C.SectionContent>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="data_treinamento_formacao_nr10">Treinamento NR10 (Formação)</C.Label>
                      <C.Input
                        type="text"
                        name="data_treinamento_formacao_nr10"
                        id="data_treinamento_formacao_nr10"
                        value={formData.data_treinamento_formacao_nr10}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                    <C.FormColumn>
                      <C.Label htmlFor="data_treinamento_reciclagem_nr10">Treinamento NR10 (Reciclagem)</C.Label>
                      <C.Input
                        type="text"
                        name="data_treinamento_reciclagem_nr10"
                        id="data_treinamento_reciclagem_nr10"
                        value={formData.data_treinamento_reciclagem_nr10}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>

                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="data_treinamento_formacao_sep">Treinamento SEP (Formação)</C.Label>
                      <C.Input
                        type="text"
                        name="data_treinamento_formacao_sep"
                        id="data_treinamento_formacao_sep"
                        value={formData.data_treinamento_formacao_sep}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                    <C.FormColumn>
                      <C.Label htmlFor="data_treinamento_reciclagem_sep">Treinamento SEP (Reciclagem)</C.Label>
                      <C.Input
                        type="text"
                        name="data_treinamento_reciclagem_sep"
                        id="data_treinamento_reciclagem_sep"
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
                        id="data_treinamento_nr35"
                        value={formData.data_treinamento_nr35}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>
                </C.SectionContent>
              </>)}
          </C.Section>

          <C.Section>

            {/* Documentos */}
            <C.SectionToggle type="button" onClick={(e) => toggleSection(e, "responsaveis")}>
              Responsáveis
            </C.SectionToggle>

            {openSection === "responsaveis" && (
              <>
                <C.SectionContent>
                  <C.FormRow>

                    <C.FormColumn>
                      <C.Label htmlFor="coordenador_responsavel">Coordenador Responsável</C.Label>
                      <C.Input
                        type="text"
                        name="coordenador_responsavel"
                        id="coordenador_responsavel"
                        value={formData.coordenador_responsavel}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>
                  <C.FormRow>
                    <C.FormColumn>
                      <C.Label htmlFor="ehs_responsavel">Responsável EHS</C.Label>
                      <C.Input
                        type="text"
                        name="ehs_responsavel"
                        id="ehs_responsavel"
                        value={formData.ehs_responsavel}
                        onChange={handleChange}
                      />
                    </C.FormColumn>
                  </C.FormRow>
                </C.SectionContent>
              </>)}
          </C.Section>

          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditPessoaModal;
