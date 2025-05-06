import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";
import { memo } from "react";

const TeamCard = memo(
  ({
    image,
    name,
    priority = false,
  }: {
    image: string;
    name: string;
    priority?: boolean;
  }) => {
    return (
      <div className="team-card">
        <div className="image-container">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            loading={priority ? "eager" : "lazy"}
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+F/PQAJJANm19bNwAAAAABJRU5ErkJggg=="
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
            contain: content;
          }

          .image-container {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.3s ease;
            border-top-left-radius: 100px;
            border-top-right-radius: 100px;
            will-change: transform;
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
            background-color: rgba(205, 169, 136, 0.5);
            border-top-left-radius: 100px;
            border-top-right-radius: 100px;
          }

          .name {
            color: ${themeVariables.grassGreen};
            font-size: 1.5rem;
            font-family: ${rawengulkDemibold.style.fontFamily};
            text-align: center;
          }

          .team-card:hover .name-overlay {
            opacity: 1;
          }
        `}</style>
      </div>
    );
  }
);

TeamCard.displayName = "TeamCard";

export default TeamCard;
