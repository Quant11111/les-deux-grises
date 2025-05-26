"use client";

import { useLocale, useTranslations } from "next-intl";
import themeVariables from "@/utils/themeVariables";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import Link from "next/link";

export default function Privacy() {
  const locale = useLocale();
  const nt = useTranslations("Navbar");
  const t = useTranslations("Privacy");

  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        background: themeVariables.grassGreen,
      }}
    >
      <LogoSvg
        size={150}
        color={themeVariables.lightForeground}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />

      <Navbar
        active=""
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <div
        style={{
          flex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          marginTop: "6rem",
        }}
      >
        <div className="privacy-content">
          <h1 className="privacy-title">{t("title")}</h1>

          <div className="privacy-section">
            <h2 className="section-title">{t("dataCollection")}</h2>
            <p className="section-text">{t("dataCollectionText")}</p>
          </div>

          <div className="privacy-section">
            <h2 className="section-title">{t("dataUsage")}</h2>
            <p className="section-text">{t("dataUsageText")}</p>
          </div>

          <div className="privacy-section">
            <h2 className="section-title">{t("dataRetention")}</h2>
            <p className="section-text">{t("dataRetentionText")}</p>
          </div>

          <div className="privacy-section">
            <h2 className="section-title">{t("yourRights")}</h2>
            <p className="section-text">{t("yourRightsText")}</p>
          </div>

          <div className="privacy-section">
            <h2 className="section-title">{t("contact")}</h2>
            <p className="section-text">
              {t("contactText")}{" "}
              <a href="mailto:ldg@lesdeuxgrises.com" className="contact-link">
                ldg@lesdeuxgrises.com
              </a>
            </p>
          </div>

          <div className="back-link">
            <Link href={`/${locale}`} className="back-button">
              ← {t("backHome")}
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .privacy-content {
          background: ${themeVariables.lighterCloudyMist};
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .privacy-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: ${themeVariables.grassGreen};
          text-align: center;
          margin-bottom: 2rem;
          border-bottom: 3px solid ${themeVariables.neutralEarth};
          padding-bottom: 1rem;
        }

        .privacy-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${themeVariables.corporateBlue};
          margin-bottom: 1rem;
        }

        .section-text {
          font-size: 1rem;
          line-height: 1.6;
          color: ${themeVariables.nightGrey};
          text-align: justify;
        }

        .contact-link {
          color: ${themeVariables.grassGreen};
          text-decoration: none;
          font-weight: 600;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        .back-link {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid ${themeVariables.coolBlueGrey};
        }

        .back-button {
          display: inline-block;
          background: ${themeVariables.grassGreen};
          color: ${themeVariables.lightForeground};
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: ${themeVariables.corporateBlue};
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .privacy-content {
            padding: 2rem;
          }

          .privacy-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .section-text {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .privacy-content {
            padding: 1.5rem;
          }

          .privacy-title {
            font-size: 1.8rem;
          }

          .section-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </main>
  );
}
