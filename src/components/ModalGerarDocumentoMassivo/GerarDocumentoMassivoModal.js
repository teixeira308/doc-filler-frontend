import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";

const GerarDocumentoMassivoModal = ({ isOpen, onClose, template }) => {
  const { updateTemplate } = useApi();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [selectedPessoas, setSelectedPessoas] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Paginação
  const [page, setPage] = useState(1);
  const pageSize = 100; // Carregar sempre 100 pessoas por página
  const [totalPages, setTotalPages] = useState(1);
  const [totalPessoas, setTotalPessoas] = useState(0);

  useEffect(() => {
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
  }, [page]);

  // Alternar seleção de uma pessoa específica
  const togglePessoaSelection = (id) => {
    setSelectedPessoas((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Alternar seleção global
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedPessoas(new Set()); // Limpa seleção manual ao marcar "Selecionar Tudo"
  };

  // Troca de página
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataToSend;

      if (selectAll) {
        // Envia flag de "todos" e backend cuida da geração em lotes de 100
        dataToSend = { selectAll: true };
      } else {
        // Envia apenas IDs selecionados manualmente
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
              <C.Label>
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                Selecionar TODAS as Pessoas (100 por vez)
              </C.Label>

              <C.ListContainer>
                {pessoas.length > 0 ? (
                  pessoas.map((pessoa) => (
                    <C.ListItem key={pessoa.id}>
                      <input
                        type="checkbox"
                        checked={selectedPessoas.has(pessoa.id)}
                        onChange={() => togglePessoaSelection(pessoa.id)}
                        disabled={selectAll} // Desativa se "Selecionar Todas" estiver ativo
                      />
                      {pessoa.nome}
                    </C.ListItem>
                  ))
                ) : (
                  <p>Nenhuma pessoa encontrada.</p>
                )}
              </C.ListContainer>
            </C.FormColumn>
          </C.FormRow>

          {/* Paginação */}
          <C.Pagination>
            <C.Button disabled={page === 1} onClick={prevPage}><BsFillCaretLeftFill/></C.Button>
            <span>Página {page} de {totalPages}</span>
            <C.Button disabled={page === totalPages} onClick={nextPage}><BsFillCaretRightFill/></C.Button>
          </C.Pagination>

          <C.Button type="submit">Gerar Documentos</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;
