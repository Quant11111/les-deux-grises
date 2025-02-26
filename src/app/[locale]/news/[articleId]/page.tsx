import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import ArticlePageContent from "./ArticlePageContent";

export default function Article({ params }: { params: { articleId: string } }) {
  const locale = useLocale();
  const nt = useTranslations("Navbar");
  return (
    <main
      style={{
        height: "100dvh",
        width: "100vw",
      }}
    >
      <Navbar
        active="news"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        about1={nt("about1")}
        about2={nt("about2")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <ArticlePageContent locale={locale} id={params.articleId} />
    </main>
  );
}
