import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";


const GerarDocumentoMassivoModal = ({ isOpen, onClose, template }) => {
  const { updateTemplate, generateBatchDocuments } = useApi();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [selectedPessoas, setSelectedPessoas] = useState([]);
  const [selectedGrupos, setSelectedGrupos] = useState([]);


  const [page, setPage] = useState(1);
  const pageSize = 100;
  const [totalPages, setTotalPages] = useState(1);
  const [totalPessoas, setTotalPessoas] = useState(0);


  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [modoSelecao, setModoSelecao] = useState("todos");
  const { getGruposPessoa } = useApiGrupo();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    if (modoSelecao === "grupo") {
      const fetchGrupos = async () => {
        try {
          const data = await getGruposPessoa(page, pageSize);
          setGrupos(data.data);
          setTotalPages(data.totalPages);
          setTotalPessoas(data.totalCount);
        } catch (error) {
          console.error("Erro ao carregar grupos: ", error);
        }
      };
      fetchGrupos();
    }
  }, [page, modoSelecao]); // Atualiza quando `currentPage` muda


  const toggleGrupoSelection = (grupo) => {
    setSelectedGrupos((prev) => {
      const exists = prev.some(g => g.id === grupo.id);
      if (exists) return prev.filter(g => g.id !== grupo.id);
      if (prev.length >= 10) return prev; // Limita a 10 grupos
      return [...prev, grupo];
    });
  };


  useEffect(() => {
    if (modoSelecao === "pessoa") {
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
  }, [page, modoSelecao]);

  const togglePessoaSelection = (pessoa) => {
    setSelectedPessoas((prev) => {
      const exists = prev.some(p => p.id === pessoa.id);
      if (exists) return prev.filter(p => p.id !== pessoa.id);
      if (prev.length >= 100) return prev;
      return [...prev, pessoa];
    });
  };

  const removePessoa = (id) => {
    setSelectedPessoas((prev) => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    try {
      let dataToSend;

      if (modoSelecao === "todos") {
        dataToSend = { templateId: template.id };
      } else if (modoSelecao === "pessoa") {
        if (selectedPessoas.length === 0) {
          alert("Selecione pelo menos uma pessoa!");
          setIsLoading(false);
          return;
        }
        dataToSend = {
          templateId: template.id,
          pessoaIds: selectedPessoas.map(p => p.id),
        };
      } else if (modoSelecao === "grupo") {
        if (selectedGrupos.length === 0) {
          alert("Selecione pelo menos um grupo!");
          setIsLoading(false);
          return;
        }
        dataToSend = {
          templateId: template.id,
          grupoIds: selectedGrupos.map(g => g.id),
        };
      }

      console.log(dataToSend)
      const fileContent = await generateBatchDocuments(dataToSend);


      //console.log(fileContent)
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;

      generateZipFile(fileContent, "Arquivos-gerados-" + formattedDate);

    } catch (err) {
      console.error("Erro ao gerar documentos:", err);
      setError("Erro ao gerar documentos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateZipFile = (data, fileName) => {
    const blob = new Blob([data], { type: "application/zip" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.zip`);

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Libera a memória depois
    window.URL.revokeObjectURL(url);
  };



  const nextPage = (e) => {
    e.stopPropagation();
    setPage((prev) => Math.min(prev + 1, totalPages))
  };
  const prevPage = (e) => {
    e.stopPropagation();
    setPage((prev) => Math.max(prev - 1, 1))
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Gerar documentos massivamente</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>

        <C.ModalForm onSubmit={handleSubmit}>
          <C.Label><strong>Template:</strong> {template.descricao}</C.Label>

          <C.RadioGroup>
            <C.RadioOption>
              <input
                type="radio"
                id="todos"
                name="geracao"
                value="todos"
                checked={modoSelecao === "todos"}
                onChange={() => setModoSelecao("todos")}
              />
              <label htmlFor="todos">Gerar documentos para <strong>TODAS</strong> as pessoas</label>
            </C.RadioOption>
            <C.RadioOption>
              <input
                type="radio"
                id="pessoa"
                name="geracao"
                value="pessoa"
                checked={modoSelecao === "pessoa"}
                onChange={() => setModoSelecao("pessoa")}
              />
              <label htmlFor="pessoa">Selecionar manualmente as pessoas</label>
            </C.RadioOption>
            <C.RadioOption>
              <input
                type="radio"
                id="grupo"
                name="geracao"
                value="grupo"
                checked={modoSelecao === "grupo"}
                onChange={() => setModoSelecao("grupo")}
              />
              <label htmlFor="grupo">Gerar documentos para um grupo específico</label>
            </C.RadioOption>
          </C.RadioGroup>

          {modoSelecao === "grupo" && (
            <C.DualColumnWrapper>
              <C.Column>
                <C.PersonListTitle>Lista de Grupos</C.PersonListTitle>
                {grupos.map((grupo) => (
                  <C.PersonItem key={grupo.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedGrupos.some(g => g.id === grupo.id)}
                        onChange={() => toggleGrupoSelection(grupo)}
                        disabled={
                          selectedGrupos.length >= 10 &&
                          !selectedGrupos.some(g => g.id === grupo.id)
                        }
                      />
                      {grupo.nome}
                    </label>
                  </C.PersonItem>
                ))}

                <C.Pagination>
                  <C.ButtonPagination type="button" disabled={page === 1} onClick={(e) => prevPage(e)}><BsFillCaretLeftFill /></C.ButtonPagination>
                  <C.PageIndicator>{page} de {totalPages}</C.PageIndicator>
                  <C.ButtonPagination type="button" disabled={page === totalPages} onClick={(e) => nextPage(e)}><BsFillCaretRightFill /></C.ButtonPagination>
                </C.Pagination>
              </C.Column>

              <C.Column>
                <C.PersonListTitle>Grupos Selecionados</C.PersonListTitle>
                <C.Counter>{selectedGrupos.length} / 10</C.Counter>
                {selectedGrupos.map((grupo) => (
                  <C.PersonItem key={grupo.id}>
                    {grupo.nome}
                    <button onClick={() => toggleGrupoSelection(grupo)}>❌</button>
                  </C.PersonItem>
                ))}
              </C.Column>
            </C.DualColumnWrapper>
          )}


          {modoSelecao === "pessoa" && (
            <C.DualColumnWrapper>
              <C.Column>
                <C.PersonListTitle>Lista de Pessoas</C.PersonListTitle>
                {pessoas.map((pessoa) => (
                  <C.PersonItem key={pessoa.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPessoas.some(p => p.id === pessoa.id)}
                        onChange={() => togglePessoaSelection(pessoa)}
                        disabled={
                          selectedPessoas.length >= 100 &&
                          !selectedPessoas.some(p => p.id === pessoa.id)
                        }
                      />
                      {pessoa.nome}
                    </label>
                  </C.PersonItem>
                ))}
                <C.Pagination>
                  <C.ButtonPagination type="button" disabled={page === 1} onClick={prevPage}><BsFillCaretLeftFill /></C.ButtonPagination>
                  <C.PageIndicator>{page} de {totalPages}</C.PageIndicator>
                  <C.ButtonPagination type="button" disabled={page === totalPages} onClick={nextPage}><BsFillCaretRightFill /></C.ButtonPagination>
                </C.Pagination>
              </C.Column>

              <C.Column>
                <C.PersonListTitle>Selecionados</C.PersonListTitle>
                <C.Counter>{selectedPessoas.length} / 100</C.Counter>
                {selectedPessoas.map((pessoa) => (
                  <C.PersonItem key={pessoa.id}>
                    {pessoa.nome}
                    <button onClick={() => removePessoa(pessoa.id)}>❌</button>
                  </C.PersonItem>
                ))}
              </C.Column>
            </C.DualColumnWrapper>
          )}

          <C.Button type="submit" disabled={isLoading}>
            {isLoading ? "Gerando..." : "Gerar Documentos"}
          </C.Button>

          {success && <p style={{ color: "green", marginTop: "10px" }}>Documentos gerados com sucesso!</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default GerarDocumentoMassivoModal;
