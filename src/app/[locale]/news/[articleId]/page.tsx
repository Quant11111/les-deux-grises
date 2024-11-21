import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";

export default function Article() {
  const locale = useLocale();
  const nt = useTranslations("Navbar");
  return (
    <main>
      <Navbar active="news" locale={locale} t={nt} />
      <h1>{nt("title")}</h1>
      <p>{nt("description")}</p>
    </main>
  );
}
