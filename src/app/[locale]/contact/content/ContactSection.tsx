"use client";

// change img balancoire for cloudfront Image next compponenet

import themeVariables from "@/utils/themeVariables";

import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactSection({ locale }: { locale: string }) {
  /* const [isWebDevOpen, setIsWebDevOpen] = useState(false); */
  const t = useTranslations("contact");

  const contactInfo = {
    email: "ldg@lesdeuxgrises.com",
    phone: "+33 1 34 70 36 75",
    phone2: "+33 6 46 91 05 46",
    address: "634 Chemin de Montrognon, \n 95660 Champagne-sur-Oise",
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copié !`);
  };

  return (
    <div className="contact-container">
      <div className="contact-content-wrapper">
        <div className="contact-section-content">
          <h1 className="contact-title">{t("title")}</h1>

          <button
            className="contact-button"
            onClick={() => copyToClipboard(contactInfo.email, "Email")}
          >
            {contactInfo.email}
          </button>

          <button
            className="contact-button"
            onClick={() =>
              copyToClipboard(contactInfo.phone, "Numéro de téléphone")
            }
          >
            {contactInfo.phone}
          </button>

          <button
            className="contact-button"
            onClick={() =>
              copyToClipboard(contactInfo.phone2, "Numéro de téléphone")
            }
          >
            {contactInfo.phone2}
          </button>

          <button
            className="contact-button"
            onClick={() => copyToClipboard(contactInfo.address, "Adresse")}
          >
            {contactInfo.address}
          </button>

          {/* <div className="accordion-container">
            <div className="accordion-wrapper">
              <button
                className="accordion-header"
                onClick={() => setIsWebDevOpen(!isWebDevOpen)}
              >
                <span>{t("webdev")}</span>
                <span>{isWebDevOpen ? "▲" : "▼"}</span>
              </button>

              {isWebDevOpen && (
                <div className="accordion-content">
                  <p className={`accordion-text ${rawengulkLight.className}`}>
                    {t("webdevMessage")}
                  </p>
                  <Link
                    href="https://www.thefrenchbaguettes.com"
                    className="webdev-link"
                  >
                    {t("webdevButton")}
                  </Link>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <style jsx>{`
        .contact-container {
          position: relative;
          height: calc(100dvh - 5rem);
          width: 100vw;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          padding-top: 1rem;
          flex-direction: column;
          padding-bottom: 1rem;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .contact-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2.5rem;
          padding-top: 3rem;
          padding-left: 2rem;
          padding-right: 2rem;
          align-items: center;
          justify-content: center;
          background-image: url("https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/contact/contactbg.png");
          background-size: cover;
          background-position: center 65%;
          width: 75%;
          border-top-left-radius: 20000000000000000000000000000px;
          border-top-right-radius: 20000000000000000000000000000px;
          height: calc(100dvh - 10rem);
          max-height: 700px;
          max-width: 1300px;
        }

        .contact-section-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
          width: 100%;
        }

        .contact-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: ${themeVariables.lightForeground};
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-button {
          color: ${themeVariables.grassGreen};
          background-color: ${themeVariables.cloudyMist};
          padding: 1rem 2rem;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 400px;
          font-size: 1rem;
          transition: transform 0.2s, color 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          white-space: pre-line;
        }

        .contact-button:hover {
          color: ${themeVariables.neutralEarth};
          transform: translateY(-2px);
        }

        .accordion-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          width: 100%;
        }

        .accordion-wrapper {
          width: 100%;
          max-width: 400px;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .accordion-header {
          background-color: ${themeVariables.grassGreen};
          padding: 1rem 2rem;
          border: none;
          cursor: pointer;
          width: 100%;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${themeVariables.lightForeground};
          transition: color 0.2s;
        }

        .accordion-header:hover {
          color: ${themeVariables.secondaryGlow};
        }

        .accordion-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background-color: rgba(255, 255, 255, 1);
        }

        .accordion-text {
          text-align: center;
        }

        .webdev-link {
          background-color: ${themeVariables.grassGreen};
          color: ${themeVariables.lightForeground};
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
          text-align: center;
          display: block;
        }

        .webdev-link:hover {
          background-color: #0a3836;
        }

        /* Styles pour le design responsive */
        @media (max-width: 1200px) {
          .contact-content-wrapper {
            width: 90%;
          }
        }

        @media (max-width: 1100px) {
          .contact-button,
          .accordion-header {
            font-size: 0.9rem;
            padding: 0.9rem 1.8rem;
          }

          .contact-title {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 800px) {
          .contact-content-wrapper {
            width: 95%;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .contact-section-content {
            gap: 0.4rem;
          }

          .contact-title {
            font-size: 1.4rem;
            margin-bottom: 1rem;
          }

          .contact-button,
          .accordion-header {
            font-size: 0.8rem;
            padding: 0.8rem 1.5rem;
          }

          .webdev-link {
            padding: 0.6rem 1.2rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 500px) {
          .contact-title {
            font-size: 1.2rem;
          }

          .contact-button,
          .accordion-header {
            font-size: 0.7rem;
            padding: 0.7rem 1.2rem;
          }

          .contact-content-wrapper {
            padding-top: 2rem;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
