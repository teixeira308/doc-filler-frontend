import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';


const ApiTemplates = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_DOCFILLER_API;

    const getTemplates = async () => {

        const response = await fetch(`${apiUrl}/templates/${user?.userId}`, {
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
            throw new Error("Erro ao consultar templates do usuario");
        }

        return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
    };

    const createTemplate = async (templateData) => {
        try {
            
            const response = await fetch(`${apiUrl}/templates`, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': '*',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: templateData,
            });

            if (response.status === 403) {
                // Redireciona para a tela de login
                navigate('/login');
            }

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message || "Erro ao criar pessoa");
            }

            return response.json();
        } catch (error) {
            console.error('Erro durante o envio do arquivo:', error);
            throw error;
        }
    }

    const deleteTemplate = async (templateData) =>{

        const response = await fetch(`${apiUrl}/templates/${templateData}`, {
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
            throw new Error("Erro ao deletar template"+templateData);
        }

        return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
    
    }

    const updateTemplate  = async (id,templateData) => {
        console.log(templateData)
        const response = await fetch(`${apiUrl}/templates/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(templateData),
          });

          if (response.status === 403) {
            // Redireciona para a tela de login
            navigate('/login');
        }
        
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao atualizar template");
          }
        
          return await response.json();
    }

    const downloadTemplate = async (templateNome) =>{
        const response = await fetch(`${apiUrl}/templates/${user?.userId}/download?arquivo=${templateNome}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (response.status === 403) {
            // Redireciona para a tela de login
            navigate('/login');
        }

        if (!response.ok) {
            throw new Error("Erro ao fazer download do arquivo completado");
        }

        const arrayBuffer = await response.arrayBuffer();
        return arrayBuffer;

    }

    const downloadFilledFile = async (templateId,pessoaId) =>{
        const response = await fetch(`${apiUrl}//fill-docx-template/${templateId}/pessoa/${pessoaId}`, {
            ///fill-docx-template/:idtemplate/pessoa/:idpessoa
            method: "GET",
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (response.status === 403) {
            // Redireciona para a tela de login
            navigate('/login');
        }
        
        if (!response.ok) {
            throw new Error("Erro ao fazer download do arquivo completado");
        }

        const arrayBuffer = await response.arrayBuffer();
        return arrayBuffer;


    }

    const generateBatchDocuments = async (templateId, payload) => {
    const response = await fetch(`${apiUrl}/fill-docx-template/${templateId}/batch`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
    });

    if (response.status === 403) {
        navigate('/login');
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao gerar documentos em lote");
    }

    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
};

    return {
        getTemplates,
        createTemplate,
        deleteTemplate,
        updateTemplate,
        downloadTemplate,
        downloadFilledFile,
        generateBatchDocuments
    };
};

export default ApiTemplates;
