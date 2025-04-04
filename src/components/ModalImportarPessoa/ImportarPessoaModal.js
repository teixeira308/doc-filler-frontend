import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApiPessoas from "../../services/api";

const ImportarPessoaModal = ({ isOpen, onClose }) => {
  const { importExcelPessoas } = useApiPessoas();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setFile(null);
    onClose();
  };

  

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError("");
      setFile(null);
    }
  }, [isOpen]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    if (!file) {
      setError("Selecione um arquivo Excel (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Certifique-se que este nome bate com o do multer

    try {
      setIsLoading(true);
      await importExcelPessoas(formData);
      setSuccess(true);
      setFile(null);
    } catch (err) {
      console.error("Erro ao importar:", err);
      setError(err.message || "Erro ao importar o arquivo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Importar Excel</h2>
          <C.CloseButton onClick={handleClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <C.Label>Selecione um arquivo .xlsx:</C.Label>
          <C.Input type="file" accept=".xlsx" onChange={handleFileChange} />

          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Importando..." : "Importar"}
          </C.Button>

          {success && <p style={{ color: "green", marginTop: "10px" }}>Importação realizada com sucesso!</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default ImportarPessoaModal;
