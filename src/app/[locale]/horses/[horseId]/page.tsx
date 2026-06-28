import Navbar from "@/ui/Navbar";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import HorsePageContent from "./HorsePageContent";
import OnlySmall from "@/ui/components/OnlySmall";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Image from "next/image";
import FooterMinimal from "@/ui/components/FooterMinimal";
import { getHorseByName } from "@/horses/horsesRepository";
import styles from "./page.module.css";

// Les chevaux viennent de la base de données : on rend la page à la demande
// pour que les modifications de l'admin soient visibles immédiatement.
export const dynamic = "force-dynamic";

export default async function HorsePage({
  params,
}: {
  params: { horseId: string };
}) {
  const locale = await getLocale();
  const nt = await getTranslations("Navbar");

  const decodedId = decodeURIComponent(params.horseId);
  const horse = await getHorseByName(decodedId);

  if (!horse) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Image
        src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/horse/horsepagebg.png"
        alt="horse page background"
        fill
        className={styles.backgroundImage}
      />
      <OnlySmall>
        <LogoSvg
          size={150}
          color="rgb(var(--light-foreground))"
          className={styles.logo}
        />
      </OnlySmall>
      <OnlyLarge>
        <LogoSvg
          size={150}
          color="rgb(var(--light-foreground))"
          className={styles.logo}
        />
      </OnlyLarge>
      <Navbar
        active={"horses"}
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <div className={styles.contentWrapper}>
        <HorsePageContent horse={horse} />
      </div>
      <FooterMinimal locale={locale} />
    </main>
  );
}
