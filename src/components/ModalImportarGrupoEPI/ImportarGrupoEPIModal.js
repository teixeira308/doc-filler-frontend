import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApiGrupoEpi from "../../services/apiGrupoEpi"; 

const ImportarGrupoEPIModal = ({ isOpen, onClose }) => {
  const { importExcelGrupoEPI } = useApiGrupoEpi();
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
    formData.append("file", file); // Certifique-se de que o nome 'file' bate com o nome no backend (multer)
    
 
  
    try {
      setIsLoading(true);
      const response = await importExcelGrupoEPI(formData);  // Certifique-se de que o 'importExcelPessoas' está enviando corretamente
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
          <h2>Importar Grupo EPI Excel</h2>
          <C.CloseButton onClick={handleClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Selecione um arquivo .xlsx:</C.Label>
              <C.Input type="file" accept=".xlsx" onChange={handleFileChange} />
            </C.FormColumn>
          </C.FormRow>
          

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

export default ImportarGrupoEPIModal;
