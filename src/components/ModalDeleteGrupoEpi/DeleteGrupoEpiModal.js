// src/components/ModalDeleteEpi/DeleteEpiModal.js

import React from "react";
import * as C from "./styles";
import useApiGrupoEpi from "../../services/apiGrupoEpi";

const DeleteEpiModal = ({ isOpen, onClose, onDelete, epi }) => {
  const { deleteGrupoEpi } = useApiGrupoEpi();

  const handleDelete = async () => {
    try {
      await deleteGrupoEpi(epi.id);
      onDelete(); // Atualiza a lista no componente pai
      onClose();  // Fecha o modal
    } catch (error) {
      console.error("Erro ao deletar grupo EPI:", error);
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
          <p>Tem certeza de que deseja deletar o Grupo EPI <strong>{epi?.nome}</strong>?</p>
        </C.ModalBody>
        <C.ModalFooter>
          <C.Button onClick={handleDelete}>Deletar</C.Button>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DeleteEpiModal;
