// src/components/ModalEditEpi/EditarEpiModal.js

import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApiEpi from "../../services/apiEpi";

const EditarEpiModal = ({ isOpen, onClose, epi, onEdit }) => {
  const { updateEpi } = useApiEpi();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  const filterFormData = (data) => {
    const allowedFields = ["nome", "descricao"];
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (epi) {
      setFormData({
        nome: epi.nome || "",
        descricao: epi.descricao || "",
      });
    }
  }, [epi]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateEpi(epi.id, filteredData);
      onEdit(); // Atualiza a lista no componente pai
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao editar EPI:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar EPI</h2>
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
              <C.Label htmlFor="descricao">Descrição</C.Label>
              <C.Input
                type="text"
                name="descricao"
                id="descricao"
                value={formData.descricao}
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

export default EditarEpiModal;
