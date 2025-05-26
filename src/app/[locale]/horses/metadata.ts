import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Utiliser les mots-clés spécifiques à la page des chevaux
  let pageKeywords = t("keywords");
  try {
    pageKeywords = t("horses.keywords");
  } catch (e) {
    // En cas d'erreur, revenir aux mots-clés généraux
  }

  return {
    title: t("title") + " - " + "Horses",
    description: t("description"),
    keywords: pageKeywords,
  };
}
