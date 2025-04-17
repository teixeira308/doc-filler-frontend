import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";


const EditPessoaModal = ({ isOpen, onClose, template, onEdit }) => {
  const { updateTemplate } = useApi();
  const [formData, setFormData] = useState({
    descricao: "",
    tipoTemplate: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'descricao',
      'tipoTemplate'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };


  useEffect(() => {
    if (template) {
      setFormData(template);
    }
  }, [template]);

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
      console.log(template.id)
      await updateTemplate(template.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar template:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Template</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nome">Nome ao gerar</C.Label>
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

export default EditPessoaModal;
