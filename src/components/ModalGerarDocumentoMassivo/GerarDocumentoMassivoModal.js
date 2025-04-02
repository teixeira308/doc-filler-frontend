import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";

const GerarDocumentoMassivoModal = ({ isOpen, onClose, template }) => {
  const { updateTemplate } = useApi();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    descricao: ""
  });

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const data = await getPessoas(page, 10);
        setPessoas(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao carregar pessoas:", error);
      }
    };
    fetchPessoas();
  }, [page]);

  const filterFormData = (data) => {
    const allowedFields = ['descricao'];
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  useEffect(() => {
    if (template) {
      setFormData(template);
    }
  }, [template]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateTemplate(template.id, filteredData);
    } catch (error) {
      console.error("Erro ao editar template:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Gerar documentos massivamente</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <p><strong>Template:</strong> {template.descricao}</p>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Lista de Pessoas</C.Label>
              <C.ListContainer>
                {pessoas.length > 0 ? (
                  pessoas.map((pessoa) => (
                    <C.ListItem key={pessoa.id}>{pessoa.nome}</C.ListItem>
                  ))
                ) : (
                  <p>Nenhuma pessoa encontrada.</p>
                )}
              </C.ListContainer>
              <C.Pagination>
                <C.PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Anterior
                </C.PageButton>
                <span>Página {page} de {totalPages}</span>
                <C.PageButton disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Próxima
                </C.PageButton>
              </C.Pagination>
            </C.FormColumn>
          </C.FormRow>
          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;