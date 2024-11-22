import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import ArticlePageContent from "./ArticlePageContent";

export default function Article({ params }: { params: { articleId: string } }) {
  const locale = useLocale();
  const nt = useTranslations("Navbar");
  return (
    <main>
      <Navbar active="news" locale={locale} t={nt} />
      <ArticlePageContent locale={locale} id={params.articleId} />
    </main>
  );
}
