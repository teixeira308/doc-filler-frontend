import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApiPessoas from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";

const ImportarPessoaModal = ({ isOpen, onClose }) => {
  const { importExcelPessoas } = useApiPessoas();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getGruposPessoa } = useApiGrupo();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGruposPessoa();
        setGrupos(data.data);
      } catch (error) {
        console.error("Erro ao carregar grupos: ", error);
      }
    };
    fetchGrupos();
  }, []); // Atualiza quando `currentPage` muda

  const [grupoSelecionado, setGrupoSelecionado] = useState({
    grupoId: ""
  });

  const resetFormData = () => {
    setGrupoSelecionado({
      grupoId: "",
    });
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setFile(null);
    onClose();
  };

  const handleChange = (e) => {
    setGrupoSelecionado({
      ...grupoSelecionado,
      [e.target.name]: e.target.value,
    });
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
    
    // Verifique se o grupoId foi selecionado
    if (grupoSelecionado.grupoId) {
      formData.append("grupoId", grupoSelecionado.grupoId); // Passando o grupoId correto
    }
  
    try {
      setIsLoading(true);
      const response = await importExcelPessoas(formData);  // Certifique-se de que o 'importExcelPessoas' está enviando corretamente
      setSuccess(true);
      setFile(null);
      resetFormData();
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
          <h2>Importar Pessoas Excel</h2>
          <C.CloseButton onClick={handleClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Selecione um arquivo .xlsx:</C.Label>
              <C.Input type="file" accept=".xlsx" onChange={handleFileChange} />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="grupoId">Selecione um Grupo para registrar as pessoas importadas </C.Label>
              <C.Select
                name="grupoId"
                id="grupoId"
                value={grupoSelecionado.grupoId || ""}
                onChange={handleChange}
              >
                <option value="">Selecione um grupo</option>
                {grupos.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.nome}
                  </option>
                ))}
              </C.Select>
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

export default ImportarPessoaModal;
