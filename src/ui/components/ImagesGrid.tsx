"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

type ImageType = {
  id: number;
  src: string;
  dimensions: string;
};

const imagelist: ImageType[] = [
  {
    id: 1,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid1.jpg",
    dimensions: "352x492",
  },
  {
    id: 2,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid2.jpg",
    dimensions: "305x457",
  },
  {
    id: 3,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid3.jpg",
    dimensions: "367x551",
  },
  {
    id: 4,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid4.jpg",
    dimensions: "358x551",
  },
  {
    id: 5,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid5.jpg",
    dimensions: "305x445",
  },
  {
    id: 6,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid6.jpg",
    dimensions: "500x347",
  },
  {
    id: 7,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid7.jpg",
    dimensions: "231x347",
  },
  {
    id: 8,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid8.jpg",
    dimensions: "256x359",
  },
  {
    id: 9,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid9.jpg",
    dimensions: "239x359",
  },
  {
    id: 10,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid10.jpg",
    dimensions: "537x358",
  },
  {
    id: 11,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid11.jpg",
    dimensions: "328x492",
  },
  {
    id: 12,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid12.jpg",
    dimensions: "362x250",
  },
  {
    id: 13,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid13.jpg",
    dimensions: "158x220",
  },
  {
    id: 14,
    src: "https://dsq73kname7kn.cloudfront.net/grid/grid14.jpg",
    dimensions: "192x220",
  },
];

const ImageCard = ({ image }: { image: ImageType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (image.dimensions) {
      const [width, height] = image.dimensions.split("x").map(Number);
      setDimensions({ width, height });
    }
  }, [image.dimensions]);

  // Calculer le ratio d'aspect pour maintenir les bonnes proportions
  const aspectRatio = useMemo(() => {
    if (dimensions.width && dimensions.height) {
      return dimensions.height / dimensions.width;
    }
    return 1;
  }, [dimensions]);

  return (
    <div
      className="relative overflow-hidden rounded-lg group mb-4"
      style={{
        paddingBottom: `${aspectRatio * 100}%`,
        height: 0,
        width: "100%",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={image.src}
        alt={`Image ${image.id}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`absolute top-0 left-0 object-cover transition-all duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } group-hover:scale-105`}
        onLoadingComplete={() => setIsLoading(false)}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+"
      />
    </div>
  );
};

const ImagesGrid = () => {
  // Organiser les images en colonnes pour créer un effet masonry
  const columns = useMemo(() => {
    const cols: ImageType[][] = [[], [], [], []];

    imagelist.forEach((image) => {
      // Extraire les dimensions
      const [width, height] = image.dimensions.split("x").map(Number);
      const aspectRatio = height / width;

      // Ajouter l'image à la colonne avec la plus petite hauteur totale
      const columnHeights = cols.map((col) =>
        col.reduce((sum, img) => {
          const [w, h] = img.dimensions.split("x").map(Number);
          return sum + h / w;
        }, 0)
      );

      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      cols[shortestColumnIndex].push(image);
    });

    return cols;
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {columns.map((column, colIndex) => (
          <div key={`column-${colIndex}`} className="flex flex-col">
            {column.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesGrid;
