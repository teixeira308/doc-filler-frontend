import React, { useState, useEffect } from "react";
import * as C from "./styles";
import useApigrupoPessoas from "../../services/apiGrupoPessoas";

const EditGrupoModal = ({ isOpen, onClose, grupo, onEdit }) => {
  const { updateGrupoPessoa } = useApigrupoPessoas();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      "nome", "descricao"
    ];


    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };


  useEffect(() => {
    if (grupo) {
      setFormData(grupo);
    }
  }, [grupo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredData = filterFormData(formData);
      await updateGrupoPessoa(grupo.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar grupo: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Editar Grupo</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>    
        <C.ModalForm>                 
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="nome">Nome</C.Label>
              <C.Input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cpf">Descrição</C.Label>
              <C.Input
                type="text"
                name="descricao"
                id="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditGrupoModal;
