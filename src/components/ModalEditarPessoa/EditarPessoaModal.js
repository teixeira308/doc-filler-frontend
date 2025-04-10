import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/api";

const EditPessoaModal = ({ isOpen, onClose, pessoa, onEdit }) => {
  const { updatePessoa } = useApi();
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
    ehs_responsavel: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      "nome", "cpf", "rg", "dataNascimento", "numeroCarteiraTrabalho", "email",
      "dataAdmissao", "nomeMae", "nomePai", "endereco", "telefone", "estadoCivil",
      "funcao", "genero", "celular",
      "data_treinamento_formacao_nr10", "data_treinamento_reciclagem_nr10",
      "data_treinamento_reciclagem_sep", "data_treinamento_formacao_sep",
      "data_validade_documento", "coordenador_responsavel", "data_aso",
      "data_treinamento_nr35", "ehs_responsavel"
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
          </C.FormRow>

          <C.FormRow>
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
            <C.FormColumn>
              <C.Label htmlFor="datanascimento">Data de Nascimento</C.Label>
              <C.Input
                type="text"
                name="datanascimento"
                id="datanascimento"
                value={formData.datanascimento}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="numerocarteiratrabalho">
                Número da Carteira de Trabalho
              </C.Label>
              <C.Input
                type="text"
                name="numerocarteiratrabalho"
                id="numerocarteiratrabalho"
                value={formData.numerocarteiratrabalho}
                onChange={handleChange}
              />
            </C.FormColumn>
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
              <C.Label htmlFor="dataadmissao">Data de Admissão</C.Label>
              <C.Input
                type="text"
                name="dataadmissao"
                id="dataadmissao"
                value={formData.dataadmissao}
                onChange={handleChange}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="nomemae">Nome da Mãe</C.Label>
              <C.Input
                type="text"
                name="nomemae"
                id="nomemae"
                value={formData.nomemae}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nomepai">Nome do Pai</C.Label>
              <C.Input
                type="text"
                name="nomepai"
                id="nomepai"
                value={formData.nomepai}
                onChange={handleChange}
              />
            </C.FormColumn>
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
              <C.Label htmlFor="estadocivil">Estado Civil</C.Label>
              <C.Input
                type="text"
                name="estadocivil"
                id="estadocivil"
                value={formData.estadocivil}
                onChange={handleChange}
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

          <C.FormRow>
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
              <C.Label htmlFor="data_validade_documento">Validade do Documento</C.Label>
              <C.Input
                type="text"
                name="data_validade_documento"
                id="data_validade_documento"
                value={formData.data_validade_documento}
                onChange={handleChange}
              />
            </C.FormColumn>
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

          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditPessoaModal;
