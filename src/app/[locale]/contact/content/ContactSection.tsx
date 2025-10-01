"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import styles from "./ContactSection.module.css";

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
    <div className={styles.contactContainer}>
      <div className={styles.contactContentWrapper}>
        <div className={styles.contactSectionContent}>
          <h1 className={styles.contactTitle}>{t("title")}</h1>

          <button
            className={styles.contactButton}
            onClick={() => copyToClipboard(contactInfo.email, "Email")}
          >
            {contactInfo.email}
          </button>

          <button
            className={styles.contactButton}
            onClick={() =>
              copyToClipboard(contactInfo.phone, "Numéro de téléphone")
            }
          >
            {contactInfo.phone}
          </button>

          <button
            className={styles.contactButton}
            onClick={() =>
              copyToClipboard(contactInfo.phone2, "Numéro de téléphone")
            }
          >
            {contactInfo.phone2}
          </button>

          <button
            className={styles.contactButton}
            onClick={() => copyToClipboard(contactInfo.address, "Adresse")}
          >
            {contactInfo.address}
          </button>

          {/* <div className={styles.accordionContainer}>
            <div className={styles.accordionWrapper}>
              <button
                className={styles.accordionHeader}
                onClick={() => setIsWebDevOpen(!isWebDevOpen)}
              >
                <span>{t("webdev")}</span>
                <span>{isWebDevOpen ? "▲" : "▼"}</span>
              </button>

              {isWebDevOpen && (
                <div className={styles.accordionContent}>
                  <p className={`${styles.accordionText} ${rawengulkLight.className}`}>
                    {t("webdevMessage")}
                  </p>
                  <Link
                    href="https://www.thefrenchbaguettes.com"
                    className={styles.webdevLink}
                  >
                    {t("webdevButton")}
                  </Link>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}