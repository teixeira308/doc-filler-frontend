// src/services/apigrupoPessoas.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const useApigrupoPessoas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  const getGruposPessoa = async () => {
    const response = await fetch(`${apiUrl}/grupos-pessoa`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 403) {
      navigate("/login");
    }

    if (!response.ok) {
      throw new Error("Erro ao buscar grupos de pessoa");
    }

    return await response.json();
  };

  const createGrupoPessoa = async (data) => {
    const response = await fetch(`${apiUrl}/grupos-pessoa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 403) {
      navigate("/login");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar grupo");
    }

    return await response.json();
  };

  const updateGrupoPessoa = async (id, data) => {
    const response = await fetch(`${apiUrl}/grupos-pessoa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 403) {
      navigate("/login");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar grupo");
    }

    return await response.json();
  };

  const deleteGrupoPessoa = async (id) => {
    const response = await fetch(`${apiUrl}/grupos-pessoa/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 403) {
      navigate("/login");
    }

    if (!response.ok) {
      throw new Error("Erro ao deletar grupo");
    }

    return response.json(); // opcional
  };

  return {
    getGruposPessoa,
    createGrupoPessoa,
    updateGrupoPessoa,
    deleteGrupoPessoa,
  };
};

export default useApigrupoPessoas;
