import styled from "styled-components";

export const Sidebar = styled.div`
  ${({ collapsed }) => `
    position: fixed;
    top: 0;
    left: ${collapsed ? '-100%' : '0'};
    height: 100vh;
    width: 220px;
    background-color: #333;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    transition: left 0.3s ease;
    z-index: 1000;

    @media (min-width: 768px) {
      left: 0;
      width: ${collapsed ? '70px' : '220px'};
    }
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

export const Overlay = styled.div`
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;

  @media (min-width: 768px) {
    display: none;
  }
`;


export const ToggleButton = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1100;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;