import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="team">
      <h2 className={`team-title ${arkhipRegular.className}`}>Our Team</h2>

      <style jsx>{`
        .team {
          display: flex;
          height: 65vh;
          width: 100%;
          background-color: ${themeVariables.lightForeground};
        }
      `}</style>
    </section>
  );
}
