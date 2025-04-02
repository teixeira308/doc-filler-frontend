import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import GerarDocumentoPessoaModal from "../ModalGerarDocumentoPessoa/GerarDocumentoPessoaModal";


const GerarDocumentoMassivoModal = ({ isOpen, onClose, template, onEdit }) => {
  const { updateTemplate } = useApi();
  const [formData, setFormData] = useState({
    descricao: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'descricao'
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
          <h2>Gerar documentos massivamente</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <p>{template.descricao}</p>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nome">Descrição</C.Label>
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
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;
