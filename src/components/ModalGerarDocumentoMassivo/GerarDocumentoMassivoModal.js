import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";

const GerarDocumentoMassivoModal = ({ isOpen, onClose, template }) => {
  const { updateTemplate } = useApi();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [selectedPessoas, setSelectedPessoas] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const data = await getPessoas();
        setPessoas(data.data);
      } catch (error) {
        console.error("Erro ao carregar pessoas:", error);
      }
    };
    fetchPessoas();
  }, []);

  // Alternar seleção de uma pessoa específica
  const togglePessoaSelection = (id) => {
    setSelectedPessoas((prev) =>
      prev.includes(id) ? prev.filter((pessoaId) => pessoaId !== id) : [...prev, id]
    );
  };

  // Alternar seleção de todas as pessoas
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPessoas([]);
    } else {
      setSelectedPessoas(pessoas.map((pessoa) => pessoa.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = selectAll ? pessoas.map((p) => p.id) : selectedPessoas;
      console.log("IDs Selecionados:", dataToSend);

      if (dataToSend.length === 0) {
        alert("Selecione pelo menos uma pessoa!");
        return;
      }

      await updateTemplate(template.id, { pessoas: dataToSend });
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
                Selecionar Todos
              </C.Label>

              <C.ListContainer>
                {pessoas.length > 0 ? (
                  pessoas.map((pessoa) => (
                    <C.ListItem key={pessoa.id}>
                      <input
                        type="checkbox"
                        checked={selectedPessoas.includes(pessoa.id)}
                        onChange={() => togglePessoaSelection(pessoa.id)}
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

          <C.Button type="submit">Gerar Documentos</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;
