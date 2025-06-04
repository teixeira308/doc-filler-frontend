import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import {
  FaHome, FaUserFriends, FaUsers, FaHardHat,
  FaFileAlt, FaVideo, FaHeadset, FaBook, FaSignOutAlt, FaBars
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1700);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1700);

  // Atualiza se for mobile ou desktop ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1700;
      setIsMobile(mobile);
      setIsCollapsed(mobile); // atualiza colapso se mudou tipo de tela
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setIsCollapsed(true);
  };

  const handleLogout = () => {
    signout();
    navigate("/");
    if (isMobile) setIsCollapsed(true);
  };

  return (
    <>
      {isMobile && (
        <C.ToggleButton onClick={() => setIsCollapsed(false)}>
          <FaBars />
        </C.ToggleButton>
      )}

      <C.Overlay collapsed={isCollapsed} onClick={() => isMobile && setIsCollapsed(true)} />

      <C.Sidebar collapsed={isCollapsed}>
        <C.LogoSection onClick={() => isMobile && setIsCollapsed(!isCollapsed)}>
          <C.LogoImage src={logo} alt="Logo" />
          {!isCollapsed && <span>Doc Filler</span>}
        </C.LogoSection>

        <C.NavLink onClick={() => handleNavigate("/home")}>
          <FaHome />
          {!isCollapsed && <span>Início</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/pessoas")}>
          <FaUserFriends />
          {!isCollapsed && <span>Pessoas</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/grupo")}>
          <FaUsers />
          {!isCollapsed && <span>Grupo</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/epi")}>
          <FaHardHat />
          {!isCollapsed && <span>EPI</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/templates")}>
          <FaFileAlt />
          {!isCollapsed && <span>Templates</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/demonstracao")}>
          <FaVideo />
          {!isCollapsed && <span>Demonstração</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/suporte")}>
          <FaHeadset />
          {!isCollapsed && <span>Suporte</span>}
        </C.NavLink>
        <C.NavLink onClick={() => handleNavigate("/tutorial")}>
          <FaBook />
          {!isCollapsed && <span>Tutorial</span>}
        </C.NavLink>
        <C.NavLink onClick={handleLogout}>
          <FaSignOutAlt />
          {!isCollapsed && <span>Sair</span>}
        </C.NavLink>
      </C.Sidebar>
    </>
  );
};

export default Navbar;
