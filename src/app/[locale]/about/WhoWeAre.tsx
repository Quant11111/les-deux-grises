import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";

export default function WhoWeAre({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="who-we-are">
      <div className="who-we-are-background-image-container">
        <Image
          className="who-we-are-background-image"
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+30.png"
          alt="What We Do background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderTopLeftRadius: "20000000000000000000000000000px",
            borderTopRightRadius: "20000000000000000000000000000px",
          }}
        />
      </div>

      <div className="who-we-are-card">
        <h2 className={`who-we-are-card-title ${arkhipRegular.className}`}>
          {title}
        </h2>
        <p className={`who-we-are-card-content ${rawengulkDemibold.className}`}>
          {content}
        </p>
      </div>

      <style jsx>{`
        .who-we-are {
          margin-bottom: 2rem;
          position: relative;
          width: 90%;
          margin-left: 5%;
          height: 80vh;
          max-height: 600px;
          margin-top: 4rem;
        }
        .who-we-are-card-title {
          color: ${themeVariables.neutralEarth};
        }
        .who-we-are-card-content {
          white-space: pre-line;
          color: ${themeVariables.lightForeground};
        }
        @media (max-width: 1000px) {
          .who-we-are {
            display: flex;
            height: 70vh !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .who-we-are-background-image-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 100%;
          }
          .who-we-are-card {
            padding: 2rem;
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: auto;
            width: 90%;
            background-color: ${themeVariables.grassGreen};
          }
          .who-we-are-card-title {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          .who-we-are-card-content {
            font-size: 0.7rem;
          }
        }
        @media (min-width: 1000px) {
          .who-we-are {
            max-height: 600px;
            display: grid;
            grid-template-areas:
              "image null"
              "image card";
            grid-template-rows: 0.5fr 1fr;
            grid-template-columns: 2fr 1fr;
            padding: 2rem;
            gap: 2rem;
          }
          .who-we-are-background-image-container {
            position: relative;
            grid-area: image;
          }
          .who-we-are-card {
            position: relative;
            grid-area: card;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .who-we-are-card-title {
            font-size: 1.5rem;
          }
          .who-we-are-card-content {
            font-size: 0.9rem;
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
