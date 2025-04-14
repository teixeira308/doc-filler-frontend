// src/components/Modal/CreatePessoaModalStyles.js

import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  width: 100%;
  max-height: 80vh; /* altura máxima */
  overflow-y: auto;  /* scroll vertical se necessário */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff0000;
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const FormColumn = styled.div`
  flex: 1;
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

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: #45a049;
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
