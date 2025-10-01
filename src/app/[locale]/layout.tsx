import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  arkhipRegular,
  rawengulk,
  rawengulkBold,
  rawengulkDemibold,
  rawengulkLight,
} from "../fonts/fonts";
import "./globals.css";
import Newsletter from "@/ui/components/Newsletter";
import Footer from "@/ui/components/Footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL("https://lesdeuxgrises.com"),
    applicationName: "Les Deux Grises",
    authors: [{ name: "Les Deux Grises", url: "https://lesdeuxgrises.com" }],
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "newsletter" });
  return (
    <html
      lang={locale}
      className={`${arkhipRegular.variable} ${rawengulk.variable} ${rawengulkBold.variable} ${rawengulkLight.variable} ${rawengulkDemibold.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://dsq73kname7kn.cloudfront.net" />
        <meta name="theme-color" content="#076d74" />
      </head>
      <body className={arkhipRegular.className}>
        <NextIntlClientProvider messages={messages}>
          <Newsletter />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
