import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./FooterMinimal.module.css";

interface FooterMinimalProps {
  locale?: string;
}

export default function FooterMinimal({ locale = "fr" }: FooterMinimalProps) {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footerMinimal}>
      <div className={styles.footerMinimalContent}>
        <Link href={`/${locale}/privacy`} className={styles.privacyLink}>
          {t("privacy")}
        </Link>
        <span className={styles.separator}>•</span>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} Les Deux Grises
        </span>
      </div>
    </footer>
  );
}