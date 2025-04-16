// src/components/Modal/CreatePessoaModal.js

import React, { useState } from "react";
import * as C from "./styles";
import apiGrupoPessoas from "../../services/apiGrupoPessoas";

const CreateGrupoModal = ({ isOpen, onClose, onCreate }) => {
  const { createGrupoPessoa } = apiGrupoPessoas();
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
      await createGrupoPessoa(formData);
      onCreate();
      handleClose();
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
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
            </C.FormRow>
            <C.FormRow>
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

export default CreateGrupoModal;
