import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const GerarDocumentoMassivoModal = ({ isOpen, onClose, template }) => {
  const { updateTemplate } = useApi();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [selectedPessoas, setSelectedPessoas] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 100;
  const [totalPages, setTotalPages] = useState(1);
  const [totalPessoas, setTotalPessoas] = useState(0);

  useEffect(() => {
    if (!selectAll) {
      const fetchPessoas = async () => {
        try {
          const data = await getPessoas(page, pageSize);
          setPessoas(data.data);
          setTotalPages(data.totalPages);
          setTotalPessoas(data.totalCount);
        } catch (error) {
          console.error("Erro ao carregar pessoas:", error);
        }
      };
      fetchPessoas();
    }
  }, [page, selectAll]);

  const togglePessoaSelection = (id) => {
    setSelectedPessoas((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataToSend;
      if (selectAll) {
        dataToSend = { selectAll: true };
      } else {
        dataToSend = { pessoas: [...selectedPessoas] };
        if (dataToSend.pessoas.length === 0) {
          alert("Selecione pelo menos uma pessoa!");
          return;
        }
      }
      await updateTemplate(template.id, dataToSend);
    } catch (error) {
      console.error("Erro ao gerar documentos:", error);
    }
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Gerar documentos massivamente</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <p><strong>Template:</strong> {template.descricao}</p>

          <C.RadioGroup>
            <C.RadioOption>
              <input
                type="radio"
                id="manual"
                name="geracao"
                value="manual"
                checked={!selectAll}
                onChange={() => setSelectAll(false)}
              />
              <label htmlFor="manual">Selecionar manualmente as pessoas</label>
            </C.RadioOption>
            <C.RadioOption>
              <input
                type="radio"
                id="todos"
                name="geracao"
                value="todos"
                checked={selectAll}
                onChange={() => setSelectAll(true)}
              />
              <label htmlFor="todos">Gerar documentos para todas as pessoas</label>
            </C.RadioOption>
          </C.RadioGroup>

          {!selectAll && (
            <>
              <C.ListContainer>
                {pessoas.map((pessoa) => (
                  <C.ListItem key={pessoa.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPessoas.has(pessoa.id)}
                        onChange={() => togglePessoaSelection(pessoa.id)}
                      />
                      {pessoa.nome}
                    </label>
                  </C.ListItem>
                ))}
              </C.ListContainer>

              <C.Pagination>
                <C.Button disabled={page === 1} onClick={prevPage}><BsFillCaretLeftFill /></C.Button>
                <span>Página {page} de {totalPages}</span>
                <C.Button disabled={page === totalPages} onClick={nextPage}><BsFillCaretRightFill /></C.Button>
              </C.Pagination>
            </>
          )}

          <C.Button type="submit">Gerar Documentos</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;
