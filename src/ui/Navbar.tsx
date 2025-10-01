"use client";

import themeVariables from "@/utils/themeVariables";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import NavButton from "./components/NavButton";
import NavLink from "./components/NavLink";
import styles from "./Navbar.module.css";

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
      <div className={styles.navbarContainer}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          MENU
        </button>
        <nav className={styles.nav} data-open={isSidebarOpen}>
          <NavLink
            text={home}
            linkWord=""
            locale={locale}
            isActive={active === "home"}
          />
          <div className={styles.navItemContainer}>
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
    </>
  );
}