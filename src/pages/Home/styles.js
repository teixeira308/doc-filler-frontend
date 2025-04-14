import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

export const Content = styled.div`
  margin-top: 80px; /* espaço por causa da navbar */
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #777;
`;
