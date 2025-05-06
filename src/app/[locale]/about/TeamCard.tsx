import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import Image from "next/image";

export default function TeamCard({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="team-card">
      <div className="image-container">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="name-overlay">
        <p className="name">{name}</p>
      </div>

      <style jsx>{`
        .team-card {
          height: 306px;
          width: 200px;
          position: relative;
          overflow: hidden;
          margin-left: 2rem;
        }

        .image-container {
          width: 100%;
          height: 100%;
          position: relative;
          transition: filter 0.3s ease;
          border-top-left-radius: 10000000000000px;
          border-top-right-radius: 10000000000000px;
        }

        .name-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          background-color: rgba(0, 0, 0, 0.5);
          border-top-left-radius: 10000000000000px;
          border-top-right-radius: 10000000000000px;
        }

        .name {
          color: white;
          font-size: 1.5rem;
          font-family: ${rawengulkDemibold.style.fontFamily};
          text-align: center;
        }

        .team-card:hover .image-container {
          filter: blur(5px);
        }

        .team-card:hover .name-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
