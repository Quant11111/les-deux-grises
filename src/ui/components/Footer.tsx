"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import themeVariables from "@/utils/themeVariables";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <span>Les Deux Grises</span>
          </div>
          <div className="footer-nav">
            <div className="footer-nav-section">
              <h3>{t("navigation")}</h3>
              <ul>
                <li>
                  <Link href={`/${locale}`}>{t("home")}</Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`}>{t("about")}</Link>
                </li>
                <li>
                  <Link href={`/${locale}/horses`}>{t("horses")}</Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`}>{t("contact")}</Link>
                </li>
              </ul>
            </div>
            <div className="footer-nav-section">
              <h3>{t("contact")}</h3>
              <ul>
                <li>email@lesdeuxgrises.com</li>
                <li>+33 0 00 00 00 00</li>
                <li>France</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Les Deux Grises
          </div>
          <div className="socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: ${themeVariables.grassGreen};
          color: ${themeVariables.cloudyMist};
          padding: 3rem 2rem;
          width: 100%;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: lighter;
          letter-spacing: 1px;
        }

        .footer-nav {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .footer-nav-section h3 {
          font-size: 1rem;
          font-weight: normal;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .footer-nav-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-nav-section li {
          margin-bottom: 0.5rem;
          font-weight: lighter;
          font-size: 0.9rem;
        }

        .footer-nav-section a {
          color: ${themeVariables.cloudyMist};
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-nav-section a:hover {
          color: ${themeVariables.corporateBlue};
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          font-size: 0.8rem;
          font-weight: lighter;
        }

        .socials {
          display: flex;
          gap: 1.5rem;
        }

        .socials a {
          color: ${themeVariables.cloudyMist};
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }

        .socials a:hover {
          color: ${themeVariables.corporateBlue};
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: 2rem;
          }

          .footer-nav {
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
