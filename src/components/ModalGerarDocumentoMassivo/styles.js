import styled from "styled-components";

// Estilos para o overlay do modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Estilos para o container do modal
export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Estilos para o cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Estilos para o botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

// Estilos para o formulário do modal
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Estilos para cada linha do formulário
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > div {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

// Estilos para as colunas do formulário
export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilos para os rótulos dos inputs
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

// Estilos para os inputs
export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

// Estilos para o botão de submit
export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ListContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
`;

export const ListItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  transform: scale(1.2);
  cursor: pointer;
`;

export const ListItemCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export const Counter = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
  text-align: right;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  input[type="radio"] {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
