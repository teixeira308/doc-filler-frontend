// src/components/Modal/CreatePessoaModal.js

import React, { useState } from "react";
import * as C from "./styles";
import useApi from "../../services/api";

const CreateGrupoPessoaModal = ({ isOpen, onClose, onCreate }) => {
  const { createPessoa } = useApi();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
   
  });

  const resetFormData = () => {
    setFormData({
      nome: "",
      descricao: "",
    
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
          <h2>Criar Novo Grupo</h2>
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
              <C.Label htmlFor="cpf">Descrição</C.Label>
              <C.Input
                type="text"
                name="cpf"
                id="cpf"
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

export default CreateGrupoPessoaModal;
