import themeVariables from "@/utils/themeVariables";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function Navbar({
  active,
  locale,
  t,
}: {
  active: string;
  locale: string;
  t: any;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        padding: "2rem",
        height: "5rem",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "6rem",
          justifyContent: "right",
        }}
      >
        <Link
          href={`/${locale}/`}
          style={{
            color:
              active === "home"
                ? themeVariables.neutralEarth
                : themeVariables.cloudyMist,
          }}
        >
          {t("home")}
        </Link>
        <Link
          href={`/${locale}/about`}
          style={{
            color:
              active === "about"
                ? themeVariables.neutralEarth
                : themeVariables.cloudyMist,
          }}
        >
          {t("about")}
        </Link>
        <Link
          href={`/${locale}/horses`}
          style={{
            color:
              active === "horses"
                ? themeVariables.neutralEarth
                : themeVariables.cloudyMist,
          }}
        >
          {t("horses")}
        </Link>
        <Link
          href={`/${locale}/news`}
          style={{
            color:
              active === "news"
                ? themeVariables.neutralEarth
                : themeVariables.cloudyMist,
          }}
        >
          {t("news")}
        </Link>
        <Link
          href={`/${locale}/contact`}
          style={{
            color:
              active === "contact"
                ? themeVariables.neutralEarth
                : themeVariables.cloudyMist,
          }}
        >
          {t("contact")}
        </Link>
        <LanguageSelector locale={locale} />
      </nav>
    </div>
  );
}
