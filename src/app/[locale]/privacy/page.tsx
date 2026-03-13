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
        background: `linear-gradient(165deg, ${themeVariables.grassGreen} 0%, ${themeVariables.corporateBlue} 100%)`,
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

      <div className="privacy-wrapper">
        {/* Decorative background elements */}
        <div className="deco-circle deco-circle-1" />
        <div className="deco-circle deco-circle-2" />

        <div className="privacy-content">
          <div className="privacy-header">
            <div className="header-accent" />
            <h1 className="privacy-title">{t("title")}</h1>
          </div>

          <div className="sections-grid">
            <div className="privacy-section">
              <h2 className="section-title">{t("dataCollection")}</h2>
              <div className="section-divider" />
              <p className="section-text">{t("dataCollectionText")}</p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">{t("dataUsage")}</h2>
              <div className="section-divider" />
              <p className="section-text">{t("dataUsageText")}</p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">{t("dataRetention")}</h2>
              <div className="section-divider" />
              <p className="section-text">{t("dataRetentionText")}</p>
            </div>
          </div>

          <div className="back-link">
            <Link href={`/${locale}`} className="back-button">
              <span className="back-arrow">←</span>
              <span>{t("backHome")}</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .privacy-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          padding: 6rem 1.5rem 3rem;
          overflow: hidden;
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.07;
        }

        .deco-circle-1 {
          width: 500px;
          height: 500px;
          background: ${themeVariables.neutralEarth};
          top: -100px;
          right: -150px;
        }

        .deco-circle-2 {
          width: 300px;
          height: 300px;
          background: ${themeVariables.lightCoolBlueGrey};
          bottom: -50px;
          left: -100px;
        }

        .privacy-content {
          position: relative;
          z-index: 1;
          width: 100%;
          background: rgba(253, 253, 253, 0.97);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 0;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 1px 3px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          animation: fadeUp 0.6s ease-out;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .privacy-header {
          position: relative;
          background: linear-gradient(
            135deg,
            ${themeVariables.grassGreen},
            ${themeVariables.corporateBlue}
          );
          padding: 3rem 3rem 2.5rem;
          text-align: center;
          overflow: hidden;
        }

        .header-accent {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: rgba(253, 253, 253, 0.05);
          border-radius: 50%;
        }

        .privacy-title {
          position: relative;
          font-size: 2.2rem;
          font-weight: 700;
          color: ${themeVariables.lightForeground};
          margin: 0;
          letter-spacing: -0.02em;
        }

        .sections-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          padding: 2rem 3rem;
        }

        .privacy-section {
          padding: 2rem 0;
          border-bottom: 1px solid rgba(${themeVariables.cloudyMistRgb}, 0.6);
          animation: fadeIn 0.5s ease-out both;
        }

        .privacy-section:last-child {
          border-bottom: none;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${themeVariables.grassGreen};
          margin: 0 0 0.75rem;
          letter-spacing: -0.01em;
        }

        .section-divider {
          width: 40px;
          height: 3px;
          background: linear-gradient(
            90deg,
            ${themeVariables.neutralEarth},
            ${themeVariables.coolBlueGrey}
          );
          border-radius: 2px;
          margin-bottom: 1rem;
        }

        .section-text {
          font-size: 0.925rem;
          line-height: 1.75;
          color: ${themeVariables.nightGrey};
          margin: 0;
          opacity: 0.85;
        }

        .back-link {
          padding: 1.5rem 3rem 2.5rem;
          text-align: center;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: ${themeVariables.grassGreen};
          padding: 0.85rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          border: 2px solid ${themeVariables.grassGreen};
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: ${themeVariables.grassGreen};
          color: ${themeVariables.lightForeground};
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(${themeVariables.grassGreenRgb}, 0.3);
        }

        .back-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .back-button:hover .back-arrow {
          transform: translateX(-3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .privacy-wrapper {
            padding: 5rem 1rem 2rem;
          }

          .privacy-header {
            padding: 2rem 1.5rem 1.75rem;
          }

          .privacy-title {
            font-size: 1.75rem;
          }

          .sections-grid {
            padding: 1.5rem;
          }

          .privacy-section {
            padding: 1.5rem 0;
          }

          .section-title {
            font-size: 1.1rem;
          }

          .back-link {
            padding: 1rem 1.5rem 2rem;
          }

          .privacy-content {
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .privacy-header {
            padding: 1.75rem 1.25rem 1.5rem;
          }

          .privacy-title {
            font-size: 1.5rem;
          }

          .sections-grid {
            padding: 1.25rem;
          }

          .section-text {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </main>
  );
}
