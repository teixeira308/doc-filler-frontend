// src/services/useEpiApi.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const useGrupoEpiApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  const handleUnauthorized = (response) => {
    if (response.status === 403) {
      navigate('/login');
    }
  };

  const getGrupoEpis = async (page = 1, pageSize = 10)  => {
    const response = await fetch(`${apiUrl}/grupo-epi?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    handleUnauthorized(response);

    if (!response.ok) {
      throw new Error("Erro ao buscar Grupo EPIs");
    }

    return await response.json();
  };

  const createGrupoEpi = async (epiData) => {
    const response = await fetch(`${apiUrl}/grupo-epi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(epiData),
    });

    handleUnauthorized(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar grupo EPI");
    }

    return await response.json();
  };

  const updateGrupoEpi = async (id, epiData) => {
    const response = await fetch(`${apiUrl}/grupo-epi/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(epiData),
    });

    handleUnauthorized(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar grupo EPI");
    }

    return await response.json();
  };

  const deleteGrupoEpi = async (id) => {
    const response = await fetch(`${apiUrl}/grupo-epi/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    handleUnauthorized(response);

    if (!response.ok) {
      throw new Error("Erro ao deletar grupo EPI");
    }

    return await response.json(); // Caso haja resposta com mensagem
  };


const importExcelGrupoEPI = async (formData) => {
  const response = await fetch(`${apiUrl}/grupo-epi/import`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user?.token}`, // OK deixar o token
      // NÃO definir 'Content-Type' aqui! O fetch lida com isso automaticamente.
    },
    body: formData,  // Corpo da requisição contém o FormData com o arquivo e o grupoId
  });

  if (!response.ok) {
    // Se a resposta não for bem-sucedida, lança erro
    const error = await response.json();
    throw new Error(error.message || "Erro ao importar arquivo.");
  }

  // Se a requisição for bem-sucedida, retorna o JSON da resposta
  return await response.json();
};

  return {
    getGrupoEpis,
    createGrupoEpi,
    updateGrupoEpi,
    deleteGrupoEpi,
    importExcelGrupoEPI
  };
};

export default useGrupoEpiApi;
