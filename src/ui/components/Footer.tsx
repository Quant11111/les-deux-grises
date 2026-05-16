"use client";
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import themeVariables from "@/utils/themeVariables";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { MailSvg } from "@/ui/svg/MailSvg";
import { PhoneSvg } from "@/ui/svg/PhoneSvg";
import { InstagramSvg } from "@/ui/svg/InstagramSvg";
import { FacebookSvg } from "@/ui/svg/FacebookSvg";

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = "fr" }: FooterProps) {
  const t = useTranslations("footer");

  const contactInfo = {
    email: "ldg@lesdeuxgrises.com",
    phone: "+33 1 34 70 36 75",
    phone2: "+33 6 46 91 05 46",
    address: "634 Chemin de Montrognon, 95660 Champagne-sur-Oise",
  };

  const socialLinks = {
    instagram: "https://www.instagram.com/lesdeuxgrises/",
    facebook: "https://www.facebook.com/lesdeuxgrises/",
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Section Logo */}
        <div className="footer-section logo-section">
          <LogoSvg size={200} color={themeVariables.lightForeground} />
        </div>

        {/* Section Contact */}
        <div className="footer-section contact-section">
          <h3 className="section-title">Contact</h3>
          <div className="contact-item">
            <MailSvg size={20} color={themeVariables.lightForeground} />
            <a href={`mailto:${contactInfo.email}`} className="contact-link">
              {contactInfo.email}
            </a>
          </div>
          <div className="contact-item">
            <PhoneSvg size={20} color={themeVariables.lightForeground} />
            <a href={`tel:${contactInfo.phone}`} className="contact-link">
              {contactInfo.phone}
            </a>
          </div>
          <div className="contact-item">
            <PhoneSvg size={20} color={themeVariables.lightForeground} />
            <a href={`tel:${contactInfo.phone2}`} className="contact-link">
              {contactInfo.phone2}
            </a>
          </div>
          <div className="contact-item ">
            <span className="contact-text">{contactInfo.address}</span>
          </div>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="footer-section social-section">
          <h3 className="section-title">{t("followUs")}</h3>
          <div className="social-links">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <InstagramSvg size={32} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
              aria-label="Facebook"
            >
              <FacebookSvg size={32} />
            </a>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="footer-section nav-section">
          <h3 className="section-title">{t("navigation")}</h3>
          <nav className="footer-nav">
            <Link href={`/${locale}`} className="nav-link">
              {t("home")}
            </Link>
            <Link href={`/${locale}/about`} className="nav-link">
              {t("about")}
            </Link>
            <Link href={`/${locale}/horses`} className="nav-link">
              {t("horses")}
            </Link>
            <Link href={`/${locale}/contact`} className="nav-link">
              {t("contact")}
            </Link>
            <Link href={`/${locale}/privacy`} className="nav-link privacy-link">
              {t("privacy")}
            </Link>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Les Deux Grises. {t("copyright")}.
        </p>
      </div>

      <style jsx>{`
        .footer {
          color: ${themeVariables.neutralEarth};
          padding: 2.25rem 1.5rem 1rem;
          margin-top: auto;
          border-top: 1px solid rgba(205, 169, 136, 0.18);
        }

        .footer-content {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.75rem;
          align-items: start;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .logo-section {
          align-items: center;
          text-align: center;
        }

        .footer-tagline {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.25rem;
          color: ${themeVariables.cloudyMist};
        }

        .section-title {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          color: ${themeVariables.cloudyMist};
          border-bottom: 1px solid rgba(205, 169, 136, 0.4);
          padding-bottom: 0.4rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.3rem;
        }

        .contact-item.address {
          align-items: flex-start;
          margin-top: 0.75rem;
        }

        .contact-link {
          color: ${themeVariables.neutralEarth};
          text-decoration: none;
          transition: color var(--duration-base) var(--ease-out);
          font-size: 0.85rem;
          letter-spacing: 0.02em;
        }

        .contact-link:hover {
          color: ${themeVariables.lightForeground};
        }

        .contact-text {
          font-size: 0.85rem;
          line-height: 1.55;
          white-space: pre-line;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: transparent;
          transition: background-color var(--duration-base) var(--ease-out),
            opacity var(--duration-base) var(--ease-out);
          text-decoration: none;
          opacity: 0.85;
        }

        .social-link:hover {
          background-color: rgba(227, 221, 210, 0.1);
          opacity: 1;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-link {
          color: ${themeVariables.neutralEarth} !important;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          transition: color var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out),
            padding-left var(--duration-base) var(--ease-out);
          padding: 0.2rem 0;
          border-left: 1px solid transparent;
          padding-left: 0.6rem;
        }

        .nav-link:hover {
          color: ${themeVariables.cloudyMist} !important;
          border-left-color: ${themeVariables.neutralEarth};
          padding-left: 0.8rem;
        }

        .footer-bottom {
          margin-top: 1.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(205, 169, 136, 0.18);
          text-align: center;
        }

        .copyright {
          font-size: 0.75rem;
          color: ${themeVariables.neutralEarth};
          letter-spacing: 0.06em;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer {
            padding: 1.5rem 1rem 0.75rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            text-align: center;
          }

          .logo-section {
            order: -1;
          }

          .contact-item {
            justify-content: center;
          }

          .contact-item.address {
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          .footer-nav {
            align-items: center;
          }

          .nav-link {
            color: ${themeVariables.neutralEarth} !important;
            border-left: none;
            border-bottom: 2px solid transparent;
            padding-left: 0;
            padding-bottom: 0.2rem;
          }

          .nav-link:hover {
            border-left: none;
            border-bottom-color: ${themeVariables.neutralEarth};
          }
        }

        @media (max-width: 480px) {
          .footer {
            padding: 1.25rem 1rem 0.75rem;
          }

          .footer-content {
            gap: 1rem;
          }

          .section-title {
            font-size: 1rem;
          }

          .contact-link,
          .contact-text,
          .nav-link {
            font-size: 0.8rem;
          }

          .social-link {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </footer>
  );
}
