// src/components/Modal/DeletePessoaModal.js

import React from "react";
import * as C from "./styles";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";

const DeleteGrupoModal = ({ isOpen, onClose, onDelete, grupo }) => {

 const { deleteGrupoPessoa } = useApigrupoPessoas();

  const handleDelete = async () => {
    try {
      await deleteGrupoPessoa(grupo);
      onDelete();
      onClose();
    } catch (error) {
      console.error("Erro ao deletar grupo:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Confirmar Exclusão</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalBody>
          <p>Tem certeza de que deseja deletar este grupo?</p>
        </C.ModalBody>
        <C.ModalFooter>
          <C.Button onClick={handleDelete}>Deletar</C.Button>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DeleteGrupoModal;
