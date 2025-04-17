import React, { useState } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";

const CreateTemplateModal = ({ isOpen, onClose, onCreate }) => {
  const { createTemplate } = useApi();
  const [formData, setFormData] = useState({
    file: null,
    descricao: "",
    tipoTemplate: "",
    nome: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "file" ? files[0] : value
    });
  };

  const resetFormData = () => {
    setFormData({
      file: null,
      descricao: "",
      tipoTemplate: "",
      nome: ""
    });
  };

  const handleClose = () => {
    onClose();
    resetFormData(); // Limpa o formulário ao fechar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("descricao", formData.descricao);
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("tipoTemplate", formData.tipoTemplate);
      await createTemplate(formDataToSend);
      onCreate();
      handleClose();
    } catch (error) {
      console.error("Erro  ao criar template:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Criar Novo Template</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="file">Arquivo</C.Label>
              <C.Input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="descricao">Nome ao gerar</C.Label>
              <C.Input
                type="text"
                name="descricao"
                id="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nome">Nome do arquivo</C.Label>
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
              <C.Label htmlFor="tipoTemplate">Tipo</C.Label>
              <C.Select
                name="tipoTemplate"
                id="tipoTemplate"
                value={formData.tipoTemplate}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="Pessoas">Pessoas</option>
                <option value="EPIs">EPIs</option>
              </C.Select>
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CreateTemplateModal;
