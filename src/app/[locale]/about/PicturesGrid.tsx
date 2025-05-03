"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import images from "./images.json";

type ImageType = {
  url: string;
  width: string;
  height: string;
};

const PicturesGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridItems, setGridItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Préparation et calcul des dimensions des images
    const prepareGrid = () => {
      // Extraction des dimensions originales
      const imagesSizes = images.map((img) => ({
        ...img,
        aspectRatio: parseInt(img.height) / parseInt(img.width),
        normalizedWidth: parseInt(img.width) / 100, // Normalisation pour faciliter les calculs
        normalizedHeight: parseInt(img.height) / 100,
      }));

      // Calcul de la somme des ratios pour déterminer les dimensions relatives
      const totalArea = imagesSizes.reduce(
        (sum, img) => sum + img.normalizedWidth * img.normalizedHeight,
        0
      );

      // Génération des éléments de grille avec dimensions relatives
      const items = imagesSizes.map((img, index) => {
        // Calcul de la taille relative en pourcentage de l'espace total
        const relativeArea =
          (img.normalizedWidth * img.normalizedHeight) / totalArea;
        // Conversion en span de grille (1-12 colonnes)
        const spanSize = Math.max(1, Math.round(relativeArea * 24));

        return (
          <div
            key={`img-${index}`}
            className="relative overflow-hidden rounded-lg group"
            style={{
              gridColumn: `span ${Math.min(spanSize, 6)}`,
              gridRow: `span ${Math.min(
                Math.round(spanSize * img.aspectRatio),
                6
              )}`,
              minHeight: "120px",
            }}
          >
            <div className="absolute inset-0 w-full h-full">
              <div
                className={`w-full h-full transition-opacity duration-300 ${
                  isLoading ? "opacity-100" : "opacity-0"
                } bg-gray-100 animate-pulse absolute inset-0 flex items-center justify-center`}
              >
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
              </div>
              <Image
                src={img.url}
                alt="Les Deux Grises"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                onLoadingComplete={() => setIsLoading(false)}
                loading="lazy"
              />
            </div>
          </div>
        );
      });

      setGridItems(items);
    };

    prepareGrid();
  }, [isLoading]);

  return (
    <section className="py-8">
      <div
        className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        ref={containerRef}
      >
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3 auto-rows-min">
          {gridItems}
        </div>
      </div>
    </section>
  );
};

export default PicturesGrid;
