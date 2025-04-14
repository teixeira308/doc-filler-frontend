// src/services/useEpiApi.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const useEpiApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  const handleUnauthorized = (response) => {
    if (response.status === 403) {
      navigate('/login');
    }
  };

  const getEpis = async () => {
    const response = await fetch(`${apiUrl}/epi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    handleUnauthorized(response);

    if (!response.ok) {
      throw new Error("Erro ao buscar EPIs");
    }

    return await response.json();
  };

  const createEpi = async (epiData) => {
    const response = await fetch(`${apiUrl}/epi`, {
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
      throw new Error(errorData.message || "Erro ao criar EPI");
    }

    return await response.json();
  };

  const updateEpi = async (id, epiData) => {
    const response = await fetch(`${apiUrl}/epi/${id}`, {
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
      throw new Error(errorData.message || "Erro ao atualizar EPI");
    }

    return await response.json();
  };

  const deleteEpi = async (id) => {
    const response = await fetch(`${apiUrl}/epi/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    handleUnauthorized(response);

    if (!response.ok) {
      throw new Error("Erro ao deletar EPI");
    }

    return await response.json(); // Caso haja resposta com mensagem
  };

  return {
    getEpis,
    createEpi,
    updateEpi,
    deleteEpi
  };
};

export default useEpiApi;
