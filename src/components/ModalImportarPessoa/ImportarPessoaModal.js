import React, { useState } from "react";
import * as C from "./styles"; 
import useApiPessoas from "../../services/api"; 

const ImportarPessoaModal = ({ isOpen, onClose }) => {
  const { importExcelPessoas } = useApiPessoas(); // Assumindo que você já criou esse endpoint no service
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Selecione um arquivo Excel (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // deve bater com o nome usado no multer

    try {
      setIsLoading(true);
      await importExcelPessoas(formData); // chamada à API
      alert("Importação concluída!");
      onClose();
    } catch (error) {
      console.error("Erro ao importar:", error);
      alert("Erro ao importar o arquivo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Importar Excel</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <C.Label>Selecione um arquivo Excel (.xlsx)</C.Label>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          
          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Importando..." : "Importar"}
          </C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default ImportarPessoaModal;
