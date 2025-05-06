import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";

export default function WhatWeDo({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="what-we-do">
      <div
        className="what-we-do-background"
        style={{
          position: "relative",
          maxWidth: "1200px",
          height: "calc(100dvh - 10rem)",
          maxHeight: "700px",
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          className="what-we-do-background-image"
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+28.png"
          alt="What We Do background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            borderTopLeftRadius: "20000000000000000000000000000px",
            borderTopRightRadius: "20000000000000000000000000000px",
          }}
        />
        <div className="what-we-do-card">
          <h2 className={`what-we-do-card-title ${arkhipRegular.className}`}>
            {title}
          </h2>
          <p
            className={`what-we-do-card-content ${rawengulkDemibold.className}`}
          >
            {content}
          </p>
          <div className="what-we-do-card-image-container">
            <Image
              className="what-we-do-card-image"
              src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+29.png"
              alt="What We Do card image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .what-we-do {
          position: relative;
          margin-top: 20px;
          max-height: 700px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .what-we-do-card {
          position: absolute;
          display: grid;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          grid-template-areas:
            "image title"
            "image content";
          grid-template-columns: 250px 400px;
          grid-template-rows: 90px 1fr;
          gap: 1rem;
          height: auto;
          padding: 1rem;
          background-color: ${themeVariables.cloudyMist};
        }
        .what-we-do-card-title {
          color: ${themeVariables.grassGreen};
          margin-top: 40px;
          grid-area: title;
          font-size: 1.5rem;
        }
        .what-we-do-card-content {
          white-space: pre-line;
          grid-area: content;
          font-size: 0.75rem;
          margin-bottom: 45px;
        }
        .what-we-do-card-image-container {
          position: relative;
          grid-area: image;
          width: 100%;
          height: 100%;
        }
        @media (max-width: 750px) {
          .what-we-do-card {
            top: 50%;
            grid-template-columns: 0px 60vw;
            opacity: 0.9;
          }
          .what-we-do-card-content {
            font-size: 0.8rem;
          }
        }
        @media (min-width: 1300px) {
          .what-we-do-card {
            top: 62%;
            left: 31%;
          }
        }
      `}</style>
    </section>
  );
}
