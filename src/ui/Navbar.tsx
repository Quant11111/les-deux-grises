"use client";

import themeVariables from "@/utils/themeVariables";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import NavButton from "./components/NavButton";
import NavLink from "./components/NavLink";

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
      <div
        className="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
          padding: "2rem",
          height: "5rem",
          fontSize: "0.9rem",
          fontWeight: "lighter",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {" "}
        <button
          className="menu-button"
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            display: "none",
            background: "transparent",
            border: "none",
            color: themeVariables.cloudyMist,
            fontSize: "1.5rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
            padding: "0.5rem",
            borderRadius: "3rem",
          }}
        >
          MENU
        </button>
        <nav
          style={{
            display: "flex",
            gap: "6rem",
            justifyContent: "right",
          }}
        >
          <NavLink
            text={home}
            linkWord=""
            locale={locale}
            isActive={active === "home"}
          />
          <div
            style={{
              position: "relative",
            }}
          >
            <NavLink
              text={about}
              linkWord="about"
              locale={locale}
              isActive={active === "about"}
            />
          </div>

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
        </nav>
      </div>
      <style jsx>{`
        @media (max-width: 1100px) {
          nav {
            display: "flex";
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
            transform: ${isSidebarOpen ? "translateX(0)" : "translateX(-100%)"};
            transition: transform 0.3s ease-in-out;
          }
          .menu-button {
            display: flex !important;
          }
          .navbar {
            height: 0 !important;
          }
          .aboutSub {
            left: -2rem;
            bottom: -3rem !important;
            gap: 0.5rem !important;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
