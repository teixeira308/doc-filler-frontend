import styled from "styled-components";

export const Sidebar = styled.div`
  ${({ collapsed }) => `
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: ${collapsed ? "70px" : "220px"};
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    transition: width 0.3s ease;
    z-index: 1000;
  `}
`;


export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 15px;
  cursor: pointer;

  svg {
    margin-left: auto;
  }
`;

export const LogoImage = styled.img`
  height: 30px;
  width: auto;
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #444;
  }

  svg {
    font-size: 1.2rem;
  }

  span {
    font-size: 1rem;
  }
`;
