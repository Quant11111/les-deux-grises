"use client";

import themeVariables from "@/utils/themeVariables";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import NavButton from "./components/NavButton";
import NavLink from "./components/NavLink";
import styled from "styled-components";

// Styled Components
const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 2rem;
  height: 5rem;
  font-size: 0.9rem;
  font-weight: lighter;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;

  @media (max-width: 1100px) {
    height: 0 !important;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: none;
  background: transparent;
  border: none;
  color: ${themeVariables.cloudyMist};
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  padding: 0.5rem;
  border-radius: 3rem;

  @media (max-width: 1100px) {
    display: flex !important;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 6rem;
  justify-content: right;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    position: absolute;
    gap: 1rem !important;
    top: 0;
    left: 0;
    width: 250px;
    height: 100dvh !important;
    background-color: #0b2830;
    padding: 2rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
  }
`;

const NavItemContainer = styled.div`
  position: relative;
`;

export default function Navbar({
  active,
  locale,
  home,
  about,
  horses,
  contact,
}: {
  active: string;
  locale: string;
  home: string;
  about: string;
  horses: string;
  news: string;
  contact: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <MenuButton onClick={toggleSidebar}>MENU</MenuButton>
        <Nav $isOpen={isSidebarOpen}>
          <NavLink
            text={home}
            linkWord=""
            locale={locale}
            isActive={active === "home"}
          />
          <NavItemContainer>
            <NavLink
              text={about}
              linkWord="about"
              locale={locale}
              isActive={active === "about"}
            />
          </NavItemContainer>

          <NavLink
            text={horses}
            linkWord="horses"
            locale={locale}
            isActive={active === "horses"}
          />

          <NavLink
            text={contact}
            linkWord="contact"
            locale={locale}
            isActive={active === "contact"}
          />
          <LanguageSelector locale={locale} />
        </Nav>
      </NavbarContainer>
    </>
  );
}
