import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import {
  BsPencil,
  BsTrash3,
  BsPlusCircle,
  BsFillCaretLeftFill,
  BsFillCaretRightFill
} from "react-icons/bs";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";
import CreateGrupoPessoaModal from "../../components/ModalCreateGrupo/CreateGrupoModal";
import EditarGrupoModal from "../../components/ModalEditarGrupo/EditarGrupoModal";
import DeleteGrupoModal from "../../components/ModalDeleteGrupo/DeleteGrupoModal";
import useApiInteractions from "../../services/apiInteractions"

const Grupo = () => {
  const { getInteractions } = useApiInteractions()
  const navigate = useNavigate();
  const [interactions, setInteractions] = useState([])
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  //paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchInteractions();
  }, [currentPage]);

  const fetchInteractions = async () => {
    try {
      const data = await getInteractions(currentPage);
      setInteractions(data.data)
    } catch (error) {
      console.error("Erro ao carregar interactions:", error);
    }
  }



  return (
    <C.Container>
      <Navbar />
      <C.Title>Documentos Gerados</C.Title>


      <C.Button onClick={() => navigate(`/template/gerar`)}><BsPlusCircle /> Gerar documento</C.Button>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeader>Template</C.TableHeader>
            <C.TableHeader>Tipo</C.TableHeader>
            <C.TableHeader>Pessoas</C.TableHeader>
            <C.TableHeader>Grupos</C.TableHeader>
            <C.TableHeader>EPIs</C.TableHeader>
            <C.TableHeader>Criado em</C.TableHeader>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <C.TableRow key={interaction.id}>
              <C.TableData>{interaction.descricao}</C.TableData>
              <C.TableData>{interaction.tipoTemplate}</C.TableData>

              {/* Pessoas (se existirem) */}
              <C.TableData>
                {interaction.pessoas && interaction.pessoas.length > 0
                  ? interaction.pessoas.map((p) => p.nome).join(", ")
                  : interaction.data_used?.pessoaIds === "todos"
                    ? "Todos"
                    : interaction.data_used?.pessoaIds?.join(", ") || "—"
                }
              </C.TableData>

              {/* Grupos (se existirem) */}
              <C.TableData>
                {interaction.grupos && interaction.grupos.length > 0
                  ? interaction.grupos.map((g) => g.nome).join(", ")
                  : "—"}
              </C.TableData>

              {/* Lista de EPIs (com quantidade) */}
              <C.TableData>
                {interaction.epis && interaction.epis.length > 0
                  ? interaction.epis
                    .map((epi) =>
                      epi.quantidade > 1
                        ? `${epi.nome} (x${epi.quantidade})`
                        : epi.nome
                    )
                    .join(", ")
                  : "—"}
              </C.TableData>

              {/* Data formatada */}
              <C.TableData>
                {new Date(interaction.createdAt).toLocaleString("pt-BR")}
              </C.TableData>
            </C.TableRow>
          ))}

        </tbody>
      </C.Table>
      <C.PaginationContainer>
        <C.PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <BsFillCaretLeftFill />
        </C.PageButton>

        <span>Página {currentPage} de {totalPages}</span>

        <C.PageButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <BsFillCaretRightFill />
        </C.PageButton>
      </C.PaginationContainer>



    </C.Container>
  );
};

export default Grupo;
