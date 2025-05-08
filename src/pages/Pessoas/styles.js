import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f4f4f4;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const ButtonTableGroup = styled.div`
display: flex;
flex-direction: column;
gap: 6px;

@media (min-width: 769px) {
  flex-direction: row;
  gap: 10px;
 
}
`;


export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #45a049;
  }
`;

export const ButtonDelete = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color:rgb(187, 0, 0);
  }
`;

export const ButtonImport = styled(Button)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Label = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;


export const SearchInput = styled.input`
  width: 70%;
  max-width: 500px;
  padding: 10px 14px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

export const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 15px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const TableHeader = styled.th`
  background-color: rgb(173, 173, 173);
  color: white;
  padding: 12px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ActionButton = styled.button`
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
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

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  padding: 6px 10px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;

  table {
    min-width: 600px; // ou o que for necessário
  }
`;
