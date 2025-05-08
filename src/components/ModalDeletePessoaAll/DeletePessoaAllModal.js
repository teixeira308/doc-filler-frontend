// src/components/Modal/DeletePessoaModal.js

import React, { useState } from "react";
import * as C from "./styles";
import  useApi  from "../../services/api"; 


const DeletePessoaModalAll = ({ isOpen, onClose }) => {
  const { deleteAllPessoa } = useApi();
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    try {
      await deleteAllPessoa();
      setConfirmationText('')
      onClose();

    } catch (error) {
      console.error("Erro ao deletar todas as pessoas:", error);
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
          <p>Para confirmar, digite: <strong>quero realmente deletar todos os registros</strong></p>
          <C.Input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="Digite a frase de confirmação"
          />
        </C.ModalBody>
        <C.ModalFooter>
          <C.Button
            onClick={handleDelete}
            disabled={confirmationText !== "quero realmente deletar todos os registros"}
          >
            Deletar
          </C.Button>
          <C.CancelButton onClick={onClose}>Cancelar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DeletePessoaModalAll;
