"use client";

import { redirect } from "next/navigation";

export default function RootPage() {
  if (typeof window !== "undefined") {
    const preferredLanguage = navigator.language || navigator.languages[0];
    const language = preferredLanguage.startsWith("fr") ? "fr" : "en";
    redirect(`/${language}`);
  } else {
    redirect("/en");
  }
}
