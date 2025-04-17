// src/services/api.js
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const useApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  const getPessoas = async (page = 1, pageSize = 10) => {
    const response = await fetch(`${apiUrl}/pessoas?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    if (response.status === 403) {
      navigate('/login');
    }
  
    if (!response.ok) {
      throw new Error("Erro ao buscar pessoas");
    }
  
    return await response.json();
  };
  

  const createPessoa = async (pessoaData) => {
    const json = removeEmptyFields(pessoaData)
    const response = await fetch(`${apiUrl}/pessoas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(json),
    });
    if (response.status === 403) {
      // Redireciona para a tela de login
      navigate('/login');
  }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar pessoa");
    }

    return await response.json();
  };

  const deletePessoa = async (id) => {
    const response = await fetch(`${apiUrl}/pessoas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 403) {
      // Redireciona para a tela de login
      navigate('/login');
  }

    if (!response.ok) {
      throw new Error("Erro ao deletar pessoa");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
  };

  function removeEmptyFields(obj) {
    // Cria um novo objeto iterando sobre as chaves do objeto original
    return Object.fromEntries(
        // Filtra as entradas (pares [chave, valor]) onde o valor não é nulo ou vazio
        Object.entries(obj).filter(([_, value]) => value != null && value !== '')
    );
}

const updatePessoa = async (id, pessoaData) => {
  //const json = removeEmptyFields(pessoaData);
  //console.log(json)
  const response = await fetch(`${apiUrl}/pessoas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(pessoaData),
  });

  if (response.status === 403) {
    // Redireciona para a tela de login
    navigate('/login');
}

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar pessoa");
  }

  return await response.json();
};

const importExcelPessoas = async (formData) => {
  const response = await fetch(`${apiUrl}/pessoas/import`, {
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

const getPessoa = async (id) => {
 
    const response = await fetch(`${apiUrl}/pessoas/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 403) {
      // Redireciona para a tela de login
      navigate('/login');
  }

    if (!response.ok) {
      throw new Error("Erro ao consultar pessoa");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
  };


  return {
    getPessoas,
    getPessoa,
    createPessoa,
    deletePessoa,
    updatePessoa,
    importExcelPessoas
  };
};

export default useApi;
