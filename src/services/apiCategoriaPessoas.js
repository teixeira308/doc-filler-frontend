// src/services/apiCategoriaPessoas.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const useApiCategoriaPessoas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  const getCategoriasPessoa = async () => {
    const response = await fetch(`${apiUrl}/categorias-pessoa`, {
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
      throw new Error("Erro ao buscar categorias de pessoa");
    }

    return await response.json();
  };

  const createCategoriaPessoa = async (data) => {
    const response = await fetch(`${apiUrl}/categorias-pessoa`, {
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
      throw new Error(errorData.message || "Erro ao criar categoria");
    }

    return await response.json();
  };

  const updateCategoriaPessoa = async (id, data) => {
    const response = await fetch(`${apiUrl}/categorias-pessoa/${id}`, {
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
      throw new Error(errorData.message || "Erro ao atualizar categoria");
    }

    return await response.json();
  };

  const deleteCategoriaPessoa = async (id) => {
    const response = await fetch(`${apiUrl}/categorias-pessoa/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 403) {
      navigate("/login");
    }

    if (!response.ok) {
      throw new Error("Erro ao deletar categoria");
    }

    return response.json(); // opcional
  };

  return {
    getCategoriasPessoa,
    createCategoriaPessoa,
    updateCategoriaPessoa,
    deleteCategoriaPessoa,
  };
};

export default useApiCategoriaPessoas;
