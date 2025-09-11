import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApi from "../../services/apiTemplates";
import useApiPessoas from "../../services/api";
import useApiGrupo from "../../services/apiGrupoPessoas";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useEpiApi from "../../services/apiEpi";
import useApiGrupoEpi from "../../services/apiGrupoEpi";

const GerarDocumentoMassivoModal = () => {
  const { generateBatchDocuments, generateBatchDocumentsEPI, getTemplate } = useApi();
  const { getGrupoEpis } = useApiGrupoEpi();
  const { getEpis, getEpisByGroup } = useEpiApi();
  const navigate = useNavigate();
  const { getPessoas } = useApiPessoas();
  const [pessoas, setPessoas] = useState([]);
  const [epis, setEpis] = useState([]);
  const [grupoEpis, setGrupoEpis] = useState([]);
  const [selectedPessoas, setSelectedPessoas] = useState([]);
  const [selectedGrupos, setSelectedGrupos] = useState([]);
  const [selectedGruposEpi, setSelectedGruposEpi] = useState([]);
  const [selectedEPIs, setSelectedEPIs] = useState([]);
  const [template, setTemplate] = useState([]);
  const { idTemplate } = useParams();
  const [pagePessoas, setPagePessoas] = useState(1);
  const [pageGrupos, setPageGrupos] = useState(1);
  const [pageGruposEpi, setPageGruposEpi] = useState(1);
  const [pageEpi, setPageEpi] = useState(1);
  const pageSize = 100;
  const [totalPagesEpi, setTotalPagesEpi] = useState(1);
  const [totalPagesPessoas, setTotalPagesPessoas] = useState(1);
  const [totalPagesGrupos, setTotalPagesGrupos] = useState(1);
  const [totalPagesGruposEpi, setTotalPagesGruposEpi] = useState(1);
  const [totalPessoas, setTotalPessoas] = useState(0);
  const [totalGrupos, setTotalGrupos] = useState(0);
  const [totalGruposEpi, setTotalGruposEpi] = useState(0);


  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [modoSelecao, setModoSelecao] = useState("todos");
  const { getGruposPessoa } = useApiGrupo();
  const [grupos, setGrupos] = useState([]);
  const [gruposEpi, setGruposEpi] = useState([]);
  const [stepGeracao, setStepGeracao] = useState(1);
  const [episDosGrupos, setEpisDosGrupos] = useState([]);


  useEffect(() => {
    const fetchTemplateAndEPIs = async () => {
      try {
        const data = await getTemplate(idTemplate);
        setTemplate(data);

        if (data.tipoTemplate === "EPIs") {
          const epiData = await getEpis(pageEpi, pageSize);
          setEpis(epiData.data);
          setTotalPagesEpi(epiData.totalPages)
        }
      } catch (error) {
        console.error("Erro ao carregar template ou EPIs: ", error);
      }
    };
    fetchTemplateAndEPIs();
  }, [idTemplate, pageEpi]);


  useEffect(() => {
    if (modoSelecao === "grupoepi") {
      const fetchGruposEpi = async () => {
        try {
          const data = await getGrupoEpis(pageGruposEpi, pageSize);
          console.log(data.data)
          setGrupoEpis(data.data);
          setTotalPagesGruposEpi(data.totalPages);
          setTotalGruposEpi(data.totalCount);
        } catch (error) {
          console.error("Erro ao carregar gruposEpi: ", error);
        }
      };
      fetchGruposEpi();
    }
  }, [pageGruposEpi, modoSelecao]); // Atualiza quando `currentPage` muda

  useEffect(() => {
    const fetchEpisDosGrupos = async () => {
      if (stepGeracao !== 3 || selectedGruposEpi.length === 0) return;

      try {
        const allEpisPromises = selectedGruposEpi.map(grupo =>
          getEpisByGroup(grupo.id)
        );

        const episPorGrupo = await Promise.all(allEpisPromises);
        // Flatten e remove duplicados (opcional)
        const todosEpis = episPorGrupo.flat();

        // Remover duplicados pelo ID (opcional)
        const episUnicos = Array.from(
          new Map(todosEpis.map(epi => [epi.id, epi])).values()
        );

        setEpisDosGrupos(episUnicos);
      } catch (error) {
        console.error("Erro ao buscar EPIs dos grupos selecionados", error);
      }
    };

    fetchEpisDosGrupos();
  }, [stepGeracao, selectedGruposEpi]);


  useEffect(() => {
    if (modoSelecao === "grupo") {
      const fetchGrupos = async () => {
        try {
          const data = await getGruposPessoa(pageGrupos, pageSize);
          setGrupos(data.data);
          setTotalPagesGrupos(data.totalPages);
          setTotalGrupos(data.totalCount);
        } catch (error) {
          console.error("Erro ao carregar grupos: ", error);
        }
      };
      fetchGrupos();
    }
  }, [pageGrupos, modoSelecao]); // Atualiza quando `currentPage` muda


  useEffect(() => {
    if (modoSelecao === "pessoa") {
      const fetchPessoas = async () => {
        try {
          const data = await getPessoas(pagePessoas, pageSize);
          setPessoas(data.data);
          setTotalPagesPessoas(data.totalPages);
          setTotalPessoas(data.totalCount);
        } catch (error) {
          console.error("Erro ao carregar pessoas:", error);
        }
      };
      fetchPessoas();
    }
  }, [pagePessoas, modoSelecao]);

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const toggleGrupoSelection = (grupo) => {
    setSelectedGrupos((prev) => {
      const exists = prev.some(g => g.id === grupo.id);
      if (exists) return prev.filter(g => g.id !== grupo.id);
      if (prev.length >= 10) return prev; // Limita a 10 grupos
      return [...prev, grupo];
    });
  };


  const toggleEPISelection = (epi) => {
    setSelectedEPIs((prev) => {
      const exists = prev.some(e => e.id === epi.id);
      if (exists) return prev.filter(e => e.id !== epi.id);
      if (prev.length >= 10) return prev;
      return [...prev, { ...epi, quantidade: 1 }];
    });
  };

  const toggleGrupoEPISelection = (epi) => {
    setSelectedGruposEpi((prev) => {
      const exists = prev.some(e => e.id === epi.id);
      if (exists) return prev.filter(e => e.id !== epi.id);
      if (prev.length >= 10) return prev;
      return [...prev, { ...epi, quantidade: 1 }];
    });
  };

  const handleQuantidadeChange = (id, value) => {
    setSelectedEPIs((prev) =>
      prev.map((epi) =>
        epi.id === id ? { ...epi, quantidade: Number(value) } : epi
      )
    );
  };

  const handleAdvancePage = (e) => {
    e.preventDefault();
    if (selectedPessoas.length < 1 && modoSelecao !== "todos") {
      setError("Selecione ao menos uma pessoa ou grupo.");
    } else {
      setError("");
      setStepGeracao(2)
    }

  }

  const handleAdvanceFinalPage = (e) => {
    e.preventDefault();

    if (selectedGruposEpi.length < 1 && selectedEPIs.length < 1) {
      setError("Selecione ao menos um grupo de EPI.");
    } else {
      setError("");
      setStepGeracao(3)
    }
  }
  const handleBackPage = (e) => {
    e.preventDefault();
    setStepGeracao(1)
  }

  const handleBackPageMiddle = (e) => {
    e.preventDefault();
    setStepGeracao(2)
  }

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
      let dataToSend = { templateId: template.id };

      // Seleção de pessoas ou grupos
      if (modoSelecao === "pessoa") {
        if (selectedPessoas.length === 0) {
          setError("Selecione pelo menos uma pessoa!");
          setIsLoading(false);
          return;
        }
        dataToSend.pessoaIds = selectedPessoas.map(p => p.id);
      } else if (modoSelecao === "grupo") {
        if (selectedGrupos.length === 0) {
          setError("Selecione pelo menos um grupo!");
          setIsLoading(false);
          return;
        }
        dataToSend.grupoIds = selectedGrupos.map(g => g.id);
      } else if (modoSelecao === "todos") {
        dataToSend.pessoaIds = "todos";
      }

      // Seleção de EPIs
      if (template.tipoTemplate === "EPIs") {
        if (selectedEPIs.length === 0) {
          setError("Selecione pelo menos um EPI!");
          setIsLoading(false);
          return;
        }
        dataToSend.epis = selectedEPIs.map(e => ({
          id: e.id,
          quantidade: e.quantidade ?? 1,
        }));
      }


      //console.log(dataToSend);

      let fileContent;
      if (template.tipoTemplate === "EPIs") {
        fileContent = await generateBatchDocumentsEPI(dataToSend);
      } else {
        fileContent = await generateBatchDocuments(dataToSend);
      }

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



  const nextPagePessoas = (e) => {
    e.stopPropagation();
    setPagePessoas((prev) => Math.min(prev + 1, totalPagesPessoas))
  };
  const prevPagePessoas = (e) => {
    e.stopPropagation();
    setPagePessoas((prev) => Math.max(prev - 1, 1))
  };

  const nextPageEpi = (e) => {
    e.stopPropagation();
    setPageEpi((prev) => Math.min(prev + 1, totalPagesEpi))
  };
  const prevPageEpi = (e) => {
    e.stopPropagation();
    setPageEpi((prev) => Math.max(prev - 1, 1))
  };

  const nextPageGrupos = (e) => {
    e.stopPropagation();
    setPageGrupos((prev) => Math.min(prev + 1, totalPagesGrupos))
  };
  const prevPageGrupos = (e) => {
    e.stopPropagation();
    setPageGrupos((prev) => Math.max(prev - 1, 1))
  };

  const nextPageGruposEpi = (e) => {
    e.stopPropagation();
    setPageGruposEpi((prev) => Math.min(prev + 1, totalPagesGrupos))
  };
  const prevPageGruposEpi = (e) => {
    e.stopPropagation();
    setPageGruposEpi((prev) => Math.max(prev - 1, 1))
  };


  return (
    <C.PageContainer>

      <Navbar />
      <C.PageHeader>
        <Navbar />
        <h2>Gerar documentos massivamente</h2>
        <C.BackButton onClick={handleBack}>
          <FaArrowLeft />
          Voltar
        </C.BackButton>
      </C.PageHeader>

      <C.FormContainer onSubmit={handleSubmit}>

        <>
          <C.Label><strong>Template:</strong> {template.descricao}</C.Label>
          <br />
          {stepGeracao === 1 && (
            <>
              <C.Label>Selecione as pessoas: </C.Label>
              <C.RadioGroup>
                <C.RadioOption>
                  <input
                    type="radio"
                    id="todos"
                    name="geracao"
                    value="todos"
                    checked={modoSelecao === "todos"}
                    onChange={() => { setModoSelecao("todos"); setError("") }}
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
                    onChange={() => { setModoSelecao("pessoa"); setError("") }}
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
                    onChange={() => { setModoSelecao("grupo"); setError("") }}
                  />
                  <label htmlFor="grupo">Gerar documentos para um grupo específico</label>
                </C.RadioOption>
              </C.RadioGroup>
            </>
          )}
          {modoSelecao === "grupo" && (
            <C.DualColumnWrapper>
              <C.Column>
                <C.PersonListTitle>Grupos de Pessoas</C.PersonListTitle>
                {grupos.map((grupo) => (
                  <C.PersonItem key={grupo.id}>
                    <C.ListItemCheckbox>
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
                    </C.ListItemCheckbox>
                  </C.PersonItem>
                ))}

                <C.Pagination>
                  <C.ButtonPagination type="button" disabled={pageGrupos === 1} onClick={(e) => prevPageGrupos(e)}><BsFillCaretLeftFill /></C.ButtonPagination>
                  <C.PageIndicator>{pageGrupos} de {totalPagesGrupos}</C.PageIndicator>
                  <C.ButtonPagination type="button" disabled={pageGrupos === totalPagesGrupos} onClick={(e) => nextPageGrupos(e)}><BsFillCaretRightFill /></C.ButtonPagination>
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

          {modoSelecao === "pessoa" && stepGeracao === 1 && (
            <C.DualColumnWrapper>
              <C.Column>
                <C.PersonListTitle>Pessoas</C.PersonListTitle>
                {pessoas.map((pessoa) => (
                  <C.PersonItem key={pessoa.id}>
                    <C.ListItemCheckbox>

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

                    </C.ListItemCheckbox>
                  </C.PersonItem>
                ))}
                <C.Pagination>
                  <C.ButtonPagination type="button" disabled={pagePessoas === 1} onClick={prevPagePessoas}><BsFillCaretLeftFill /></C.ButtonPagination>
                  <C.PageIndicator>{pagePessoas} de {totalPagesPessoas}</C.PageIndicator>
                  <C.ButtonPagination type="button" disabled={pagePessoas === totalPagesPessoas} onClick={nextPagePessoas}><BsFillCaretRightFill /></C.ButtonPagination>
                </C.Pagination>
              </C.Column>

              <C.Column>
                <C.PersonListTitle>Pessoas Selecionadas</C.PersonListTitle>
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
          {stepGeracao === 2 && (
            <>
              {template.tipoTemplate === "EPIs" && (
                <>
                  <C.Label>Selecionados</C.Label>
                  {selectedPessoas.length == 0 && (
                    <p>Todas pessoas registradas.</p>
                  )}
                  {selectedPessoas.map((pessoa) => (
                    <C.PersonItem key={pessoa.id}>
                      {pessoa.nome}
                    </C.PersonItem>
                  ))}
                  <br />
                  <C.Label>Selecione os EPIs: </C.Label>
                  <C.RadioGroup>

                    <C.RadioOption>
                      <input
                        type="radio"
                        id="pessoa"
                        name="geracao"
                        value="pessoa"
                        checked={modoSelecao === "epi"}
                        onChange={() => { setModoSelecao("epi"); setError(""); }}
                      />
                      <label htmlFor="pessoa">Selecionar manualmente os EPIs</label>
                    </C.RadioOption>
                    <C.RadioOption>
                      <input
                        type="radio"
                        id="grupo"
                        name="geracao"
                        value="grupo"
                        checked={modoSelecao === "grupoepi"}
                        onChange={() => { setModoSelecao("grupoepi"); setError(""); }}
                      />
                      <label htmlFor="grupo">Gerar documentos para um grupo específico</label>
                    </C.RadioOption>
                  </C.RadioGroup>


                  {modoSelecao === "epi" && (
                    <>
                      <C.DualColumnWrapper>
                        <C.Column>
                          <C.PersonListTitle>EPIs</C.PersonListTitle>
                          {epis.map((epi) => (
                            <C.PersonItem key={epi.id}>
                              <C.ListItemCheckbox>
                                <input
                                  type="checkbox"
                                  checked={selectedEPIs.some(g => g.id === epi.id)}
                                  onChange={() => toggleEPISelection(epi)}
                                  disabled={
                                    selectedGrupos.length >= 10 &&
                                    !selectedGrupos.some(g => g.id === epi.id)
                                  }
                                />
                                {epi.nome}

                              </C.ListItemCheckbox>
                              CA:
                              {epi.ca}
                            </C.PersonItem>
                          ))}

                          <C.Pagination>
                            <C.ButtonPagination type="button" disabled={pageEpi === 1} onClick={(e) => prevPageEpi(e)}>
                              <BsFillCaretLeftFill />
                            </C.ButtonPagination>
                            <C.PageIndicator>{pageEpi} de {totalPagesEpi}</C.PageIndicator>
                            <C.ButtonPagination type="button" disabled={pageEpi === totalPagesEpi} onClick={(e) => nextPageEpi(e)}>
                              <BsFillCaretRightFill />
                            </C.ButtonPagination>
                          </C.Pagination>
                        </C.Column>


                        <C.Column>
                          <C.PersonListTitle>EPIs Selecionados</C.PersonListTitle>
                          <C.Counter>{selectedEPIs.length} / 10</C.Counter>
                          {selectedEPIs.map((epi) => (
                            <C.PersonItem key={epi.id}>
                              <span>{epi.nome}</span>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <label htmlFor={`qtd-${epi.id}`}>Qtd:</label>
                                <input
                                  id={`qtd-${epi.id}`}
                                  type="number"
                                  min={1}
                                  value={epi.quantidade}
                                  onChange={(e) => handleQuantidadeChange(epi.id, e.target.value)}
                                  style={{ width: "60px" }}
                                />
                              </div>

                              <button onClick={() => toggleEPISelection(epi)}>❌</button>
                            </C.PersonItem>
                          ))}

                        </C.Column>
                      </C.DualColumnWrapper>
                      <C.Button onClick={handleBackPage}>
                        Voltar
                      </C.Button>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <C.Button type="submit" disabled={isLoading}>
                          {isLoading ? "Gerando..." : "Gerar Documentos"}
                        </C.Button>
                      </div>
                    </>


                  )}
                  {modoSelecao === "grupoepi" && (
                    <>
                      <C.DualColumnWrapper>
                        <C.Column>
                          <C.PersonListTitle>Grupos de EPI</C.PersonListTitle>
                          {grupoEpis.map((grupoepi) => (
                            <C.PersonItem key={grupoepi.id}>
                              <C.ListItemCheckbox>
                                <input
                                  type="checkbox"
                                  checked={selectedGruposEpi.some(g => g.id === grupoepi.id)}
                                  onChange={() => toggleGrupoEPISelection(grupoepi)}
                                  disabled={
                                    selectedGruposEpi.length >= 10 &&
                                    !selectedGruposEpi.some(g => g.id === grupoepi.id)
                                  }
                                />
                                {grupoepi.nome}

                              </C.ListItemCheckbox>

                            </C.PersonItem>
                          ))}

                          <C.Pagination>
                            <C.ButtonPagination type="button" disabled={pageEpi === 1} onClick={(e) => prevPageGruposEpi(e)}>
                              <BsFillCaretLeftFill />
                            </C.ButtonPagination>
                            <C.PageIndicator>{pageGruposEpi} de {totalPagesGruposEpi}</C.PageIndicator>
                            <C.ButtonPagination type="button" disabled={pageEpi === totalPagesEpi} onClick={(e) => nextPageGruposEpi(e)}>
                              <BsFillCaretRightFill />
                            </C.ButtonPagination>
                          </C.Pagination>
                        </C.Column>


                        <C.Column>
                          <C.PersonListTitle>Grupos de EPIs Selecionados</C.PersonListTitle>
                          <C.Counter>{selectedGruposEpi.length} / 10</C.Counter>
                          {selectedGruposEpi.map((epi) => (
                            <C.PersonItem key={epi.id}>
                              <span>{epi.nome}</span>
                              <button onClick={() => toggleGrupoEPISelection(epi)}>❌</button>
                            </C.PersonItem>
                          ))}

                        </C.Column>
                      </C.DualColumnWrapper>
                      {template.tipoTemplate === "EPIs" && stepGeracao === 2 && (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                            <C.Button onClick={handleBackPage}>
                              Voltar
                            </C.Button>
                            <C.Button onClick={handleAdvanceFinalPage}>
                              Avançar
                            </C.Button>
                          </div>
                        </>

                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}

          {stepGeracao === 3 && (
            <>
              <C.DualColumnWrapper>
                <C.Column>
                  <C.PersonListTitle>EPIs encontrados nos grupos selecionados</C.PersonListTitle>
                  {episDosGrupos.length === 0 ? (
                    <p>Nenhum EPI encontrado para os grupos selecionados.</p>
                  ) : (
                    episDosGrupos.map(epi => (
                      <C.PersonItem key={epi.id}>
                        <div>
                          <C.ListItemCheckbox>
                            <input
                              type="checkbox"
                              checked={selectedEPIs.some(g => g.id === epi.id)}
                              onChange={() => toggleEPISelection(epi)}
                              disabled={
                                selectedGrupos.length >= 10 &&
                                !selectedGrupos.some(g => g.id === epi.id)
                              }
                            />
                            <strong>{epi.nome}</strong> (CA: {epi.ca})

                          </C.ListItemCheckbox>

                        </div>
                      </C.PersonItem>
                    ))
                  )}

                  <C.Pagination>
                    <C.ButtonPagination type="button" disabled={pageEpi === 1} onClick={(e) => prevPageGruposEpi(e)}>
                      <BsFillCaretLeftFill />
                    </C.ButtonPagination>
                    <C.PageIndicator>{pageGruposEpi} de {totalPagesGruposEpi}</C.PageIndicator>
                    <C.ButtonPagination type="button" disabled={pageEpi === totalPagesEpi} onClick={(e) => nextPageGruposEpi(e)}>
                      <BsFillCaretRightFill />
                    </C.ButtonPagination>
                  </C.Pagination>
                </C.Column>


                <C.Column>
                  <C.PersonListTitle>EPIs Selecionados</C.PersonListTitle>
                  <C.Counter>{selectedEPIs.length} / 10</C.Counter>
                  {selectedEPIs.map((epi) => (
                    <C.PersonItem key={epi.id}>
                      <span>{epi.nome}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label htmlFor={`qtd-${epi.id}`}>Qtd:</label>
                        <input
                          id={`qtd-${epi.id}`}
                          type="number"
                          min={1}
                          value={epi.quantidade}
                          onChange={(e) => handleQuantidadeChange(epi.id, e.target.value)}
                          style={{ width: "60px" }}
                        />
                      </div>
                      <button onClick={() => toggleEPISelection(epi)}>❌</button>
                    </C.PersonItem>
                  ))}

                </C.Column>
              </C.DualColumnWrapper>
              <C.Button onClick={handleBackPageMiddle}>
                Voltar
              </C.Button>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <C.Button type="submit" disabled={isLoading}>
                  {isLoading ? "Gerando..." : "Gerar Documentos"}
                </C.Button>
              </div>
            </>
          )}

          {template.tipoTemplate === "EPIs" && stepGeracao === 1 && (
            <div style={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
              <C.Button onClick={handleAdvancePage}>
                Avançar
              </C.Button>
            </div>
          )}

          {template.tipoTemplate === "Pessoas" && stepGeracao === 1 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <C.Button type="submit" disabled={isLoading}>
                {isLoading ? "Gerando..." : "Gerar Documentos"}
              </C.Button>
            </div>
          )}


          {template.tipoTemplate != "EPIs" && stepGeracao === 3 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <C.Button type="submit" disabled={isLoading}>
                {isLoading ? "Gerando..." : "Gerar Documentos"}
              </C.Button>
            </div>
          )}
          {success && <p style={{ color: "green", marginTop: "10px" }}>Documentos gerados com sucesso!</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </>
      </C.FormContainer>

    </C.PageContainer >
  );
};

export default GerarDocumentoMassivoModal;
