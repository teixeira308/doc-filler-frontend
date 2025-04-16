import React, { useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavigate = (path) => {
    navigate(path);
    setIsCollapsed(true); // Fecha sidebar no mobile
  };

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <>
      <C.ToggleButton onClick={() => setIsCollapsed(false)}>
        <FaBars />
      </C.ToggleButton>

      <C.Overlay collapsed={isCollapsed} onClick={() => setIsCollapsed(true)} />

      <C.Sidebar collapsed={isCollapsed}>
        <C.LogoSection onClick={() => setIsCollapsed(!isCollapsed)}>
          <C.LogoImage src={logo} alt="Logo" />
          {!isCollapsed && <span>Doc Filler</span>}
          <FaBars />
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
