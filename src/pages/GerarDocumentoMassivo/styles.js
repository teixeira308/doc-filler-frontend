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
  max-width: 1200px;
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

 

 
// Estilos para o botão de submit
export const Button = styled.button`
 margin-top: 20px; /* Espaçamento entre o input acima */
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

export const ButtonPagination = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  padding: 2px 6px; /* Mais compacto */
  font-size: 12px;   /* Fonte menor */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px; /* Espaço menor entre os elementos */
  margin-top: 16px;
`;




export const PageIndicator = styled.span`
  font-size: 12px; /* Menor ainda */
  display: flex;
  align-items: center;
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

export const DualColumnWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
  max-height: 400px;
  overflow-y: auto;
`;

export const PersonListTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const PersonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #eee;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
    color: red;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 5px;

    &:hover {
      color: darkred;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;
 



// Container geral da página
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

// Cabeçalho da página
export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const FormContainer = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const FormColumn = styled.div`
  flex: 1;
  min-width: 250px;

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #45a049;
  }
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.button`
  width: 100%;
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #e0e0e0;
  }
`;

export const SectionContent = styled.div`
  padding: 10px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
`;

export const BackButton = styled.button`
display: flex;
align-items: center;
gap: 8px;
background: none;
border: none;
color: #333;
font-size: 16px;
cursor: pointer;
margin-bottom: 20px;

&:hover {
  color: #007bff;
}
`;

export const SectionToggle = styled.button`
width: 100%;
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #e0e0e0;
  }
`;