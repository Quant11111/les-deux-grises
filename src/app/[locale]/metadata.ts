import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Utiliser les mots-clés spécifiques à la page d'accueil
  let pageKeywords = t("keywords");
  try {
    pageKeywords = t("home.keywords");
  } catch (e) {
    // En cas d'erreur, revenir aux mots-clés généraux
  }

  return {
    title: t("title") + " - " + "Home",
    description: t("description"),
    keywords: pageKeywords,
  };
}
