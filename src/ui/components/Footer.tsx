"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import themeVariables from "@/utils/themeVariables";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { MailSvg } from "@/ui/svg/MailSvg";
import { PhoneSvg } from "@/ui/svg/PhoneSvg";
import { InstagramSvg } from "@/ui/svg/InstagramSvg";

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
          <LogoSvg size={120} color={themeVariables.lightForeground} />
          <p className="footer-tagline">Les Deux Grises</p>
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
          <div className="contact-item address">
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
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
          border-top: 1px solid ${themeVariables.coolBlueGrey};
          color: ${themeVariables.neutralEarth};
          padding: 2rem 1.5rem 0.75rem;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
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
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.4rem;
          color: ${themeVariables.cloudyMist};
          border-bottom: 2px solid ${themeVariables.neutralEarth};
          padding-bottom: 0.3rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.3rem;
        }

        .contact-item.address {
          align-items: flex-start;
          margin-top: 0.75rem;
        }

        .contact-link {
          color: ${themeVariables.neutralEarth};
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.85rem;
        }

        .contact-link:hover {
          color: ${themeVariables.lightForeground};
        }

        .contact-text {
          font-size: 0.85rem;
          line-height: 1.3;
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
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
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
          transition: all 0.3s ease;
          padding: 0.2rem 0;
          border-left: 3px solid transparent;
          padding-left: 0.4rem;
        }

        .nav-link:hover {
          color: ${themeVariables.neutralEarth};
          border-left-color: ${themeVariables.neutralEarth};
        }

        .footer-bottom {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .copyright {
          font-size: 0.8rem;
          color: ${themeVariables.cloudyMist};
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
