"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import themeVariables from "@/utils/themeVariables";

interface FooterMinimalProps {
  locale?: string;
}

export default function FooterMinimal({ locale = "fr" }: FooterMinimalProps) {
  const t = useTranslations("footer");

  return (
    <footer className="footer-minimal">
      <div className="footer-minimal-content">
        <Link href={`/${locale}/privacy`} className="privacy-link">
          {t("privacy")}
        </Link>
        <span className="separator">•</span>
        <span className="copyright">
          © {new Date().getFullYear()} Les Deux Grises
        </span>
      </div>

      <style jsx>{`
        .footer-minimal {
          background: transparent;
          padding: 1rem 2rem;
          margin-top: auto;
        }

        .footer-minimal-content {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
        }

        .privacy-link {
          color: ${themeVariables.grassGreen};
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .privacy-link:hover {
          color: ${themeVariables.corporateBlue};
          text-decoration: underline;
        }

        .separator {
          color: ${themeVariables.coolBlueGrey};
          font-weight: bold;
        }

        .copyright {
          color: ${themeVariables.coolBlueGrey};
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .footer-minimal {
            padding: 0.75rem 1rem;
          }

          .footer-minimal-content {
            font-size: 0.8rem;
            gap: 0.75rem;
          }
        }
      `}</style>
    </footer>
  );
}
