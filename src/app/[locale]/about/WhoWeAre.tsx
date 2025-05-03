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
    <section
      className="what-we-do"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="what-we-do-background"
        style={{
          position: "relative",
          maxWidth: "calc(200dvh - 32rem)",
          height: "calc(100dvh - 10rem)",
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
          <h2 className="what-we-do-card-title">{title}</h2>
          <p className="what-we-do-card-content">{content}</p>
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
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .what-we-do-card {
          position: absolute;
          display: grid;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          grid-template-areas:
            "image title"
            "image content";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 20px 1fr;
          gap: 1rem;
          width: 1000px;
          height: auto;
          padding: 1rem;
          background-color: ${themeVariables.cloudyMist};
        }
        .what-we-do-card-title {
          grid-area: title;
          font-size: 1.2rem;
        }
        .what-we-do-card-content {
          grid-area: content;
          font-size: 1rem;
        }
        .what-we-do-card-image-container {
          position: relative;
          grid-area: image;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
}
