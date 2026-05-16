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
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1100px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className={styles.navbarContainer}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="ldg-mobile-nav"
          type="button"
        >
          <span className={styles.menuButtonLabel} aria-hidden="true">
            {isSidebarOpen ? "CLOSE" : "MENU"}
          </span>
        </button>

        <button
          type="button"
          className={styles.backdrop}
          data-open={isSidebarOpen}
          onClick={closeSidebar}
          aria-label="Close menu"
          tabIndex={isSidebarOpen ? 0 : -1}
        />

        <nav
          id="ldg-mobile-nav"
          className={styles.nav}
          data-open={isSidebarOpen}
          aria-hidden={isMobile ? !isSidebarOpen : undefined}
        >
          <div onClick={closeSidebar}>
            <NavLink
              text={home}
              linkWord=""
              locale={locale}
              isActive={active === "home"}
            />
          </div>
          <div className={styles.navItemContainer} onClick={closeSidebar}>
            <NavLink
              text={about}
              linkWord="about"
              locale={locale}
              isActive={active === "about"}
            />
          </div>

          <div onClick={closeSidebar}>
            <NavLink
              text={horses}
              linkWord="horses"
              locale={locale}
              isActive={active === "horses"}
            />
          </div>

          <div onClick={closeSidebar}>
            <NavLink
              text={contact}
              linkWord="contact"
              locale={locale}
              isActive={active === "contact"}
            />
          </div>
          <LanguageSelector locale={locale} />
        </nav>
      </div>
    </>
  );
}