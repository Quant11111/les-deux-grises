"use client";

import themeVariables from "@/utils/themeVariables";
import Link from "next/link";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

export default function Navbar({
  active,
  locale,
  home,
  about,
  horses,
  news,
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
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          padding: "2rem",
          height: "5rem",
          fontSize: "0.7rem",
          fontWeight: "lighter",
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
          <Link
            href={`/${locale}/`}
            style={{
              color:
                active === "home"
                  ? themeVariables.neutralEarth
                  : themeVariables.cloudyMist,
            }}
          >
            {home}
          </Link>
          <Link
            href={`/${locale}/about`}
            style={{
              color:
                active === "about"
                  ? themeVariables.neutralEarth
                  : themeVariables.cloudyMist,
            }}
          >
            {about}
          </Link>
          <Link
            href={`/${locale}/horses`}
            style={{
              color:
                active === "horses"
                  ? themeVariables.neutralEarth
                  : themeVariables.cloudyMist,
            }}
          >
            {horses}
          </Link>
          <Link
            href={`/${locale}/news`}
            style={{
              color:
                active === "news"
                  ? themeVariables.neutralEarth
                  : themeVariables.cloudyMist,
            }}
          >
            {news}
          </Link>
          <Link
            href={`/${locale}/contact`}
            style={{
              color:
                active === "contact"
                  ? themeVariables.neutralEarth
                  : themeVariables.cloudyMist,
            }}
          >
            {contact}
          </Link>
          <LanguageSelector locale={locale} />
        </nav>
      </div>
      <style jsx>{`
        @media (max-width: 1100px) {
          nav {
            display: "flex";
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            gap: 1rem !important;
            top: 0;
            left: 0;
            width: 250px;
            height: 100vh;
            background-color: white;
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
        }
      `}</style>
    </>
  );
}
