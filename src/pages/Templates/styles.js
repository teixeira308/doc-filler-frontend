// src/pages/Pessoas/PessoasStyles.js

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
  margin-top: 100px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

export const Table = styled.table`
  width: 60%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 2px solid #dddddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #dddddd;
`;

export const ActionButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

export const DetailsButton = styled(ActionButton)`
  background-color: #17a2b8;

  &:hover {
    background-color: #117a8b;
  }
`;


export const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
`;