// src/components/Page/CreatePessoaPageStyles.js

import styled from "styled-components";

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