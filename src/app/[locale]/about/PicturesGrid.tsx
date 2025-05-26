"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import Image from "next/image";
import images from "./images.json";

interface ImageData {
  url: string;
  width: string;
  height: string;
}

const PicturesGrid = () => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const [columns, setColumns] = useState(3);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);

    // Calculer le nombre de colonnes selon la largeur
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else if (width < 1280) setColumns(4);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Créer l'Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleImages((prev) => {
              const newSet = new Set(Array.from(prev));
              newSet.add(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    // Observer toutes les images
    imageRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    // Fallback: afficher toutes les images après 2 secondes si aucune n'est visible
    const fallbackTimer = setTimeout(() => {
      if (visibleImages.size === 0) {
        setVisibleImages(
          new Set(Array.from({ length: images.length }, (_, i) => i))
        );
      }
    }, 2000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(fallbackTimer);
    };
  }, [isClient, visibleImages.size]);

  // Gestion des touches du clavier pour le carrousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === null ? null : prev > 0 ? prev - 1 : images.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === null ? null : prev < images.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  const getImageSize = (index: number) => {
    // Créer des tailles variées pour un aspect déstructuré
    const sizes = [
      { width: 280, height: 380 },
      { width: 320, height: 240 },
      { width: 240, height: 320 },
      { width: 360, height: 280 },
      { width: 300, height: 400 },
      { width: 400, height: 300 },
      { width: 260, height: 350 },
    ];

    return sizes[index % sizes.length];
  };

  // Organiser les images en colonnes pour l'effet masonry
  const organizeInColumns = () => {
    const columnArrays: ImageData[][] = Array.from(
      { length: columns },
      () => []
    );
    const columnHeights = Array(columns).fill(0);

    images.forEach((image, index) => {
      const { height } = getImageSize(index);
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnArrays[shortestColumnIndex].push({
        ...image,
        originalIndex: index,
      } as any);
      columnHeights[shortestColumnIndex] += height + 16; // +16 pour le margin
    });

    return columnArrays;
  };

  const openCarousel = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeCarousel = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev > 0 ? prev - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev < images.length - 1 ? prev + 1 : 0
    );
  };

  if (!isClient) {
    return <div style={{ width: "100%", height: "400px" }} />; // Placeholder pendant l'hydratation
  }

  const columnArrays = organizeInColumns();

  const containerStyle: CSSProperties = {
    width: "100%",
    padding: "48px 16px",
  };

  const innerContainerStyle: CSSProperties = {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  };

  const columnStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  // Styles pour le carrousel modal
  const modalOverlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    opacity: selectedImageIndex !== null ? 1 : 0,
    visibility: selectedImageIndex !== null ? "visible" : "hidden",
    transition: "opacity 300ms ease, visibility 300ms ease",
  };

  const modalContentStyle: CSSProperties = {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalImageStyle: CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    border: "none",
    outline: "none",
    margin: 0,
    padding: 0,
    verticalAlign: "top",
    display: "block",
    boxShadow: "inset 0 0 3px 3px rgba(255, 255, 255, 0.1)",
  };

  const buttonStyle: CSSProperties = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "white",
    fontSize: "24px",
    padding: "12px 16px",
    cursor: "pointer",
    transition: "background-color 300ms ease",
    zIndex: 1001,
  };

  const closeButtonStyle: CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "white",
    fontSize: "24px",
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background-color 300ms ease",
    zIndex: 1001,
  };

  const counterStyle: CSSProperties = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "8px 16px",
    zIndex: 1001,
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={innerContainerStyle}>
          {columnArrays.map((columnImages, columnIndex) => (
            <div key={columnIndex} style={columnStyle}>
              {columnImages.map((image: any, imageIndex) => {
                const originalIndex = image.originalIndex;
                const { width, height } = getImageSize(originalIndex);
                const isVisible = visibleImages.has(originalIndex);

                const imageContainerStyle: CSSProperties = {
                  position: "relative",
                  cursor: "pointer",
                  transform: isVisible
                    ? "translateY(0px) scale(1)"
                    : "translateY(48px) scale(0.95)",
                  opacity: isVisible ? 1 : 0,
                  transition: "all 1000ms ease-out",
                  transitionDelay: `${(originalIndex % 6) * 100}ms`,
                };

                const imageWrapperStyle: CSSProperties = {
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  transition: "all 500ms ease",
                  lineHeight: 0,
                  fontSize: 0,
                };

                const imageWrapperHoverStyle: CSSProperties = {
                  transform: "scale(1.05)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                };

                const imageStyle: CSSProperties = {
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 700ms ease",
                  verticalAlign: "top",
                  border: "none",
                  outline: "none",
                  margin: 0,
                  padding: 0,
                  transform: "scale(1.02)",
                };

                const overlayStyle: CSSProperties = {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 500ms ease",
                };

                const shimmerStyle: CSSProperties = {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                  transform: "translateX(-100%)",
                  transition: "transform 1000ms ease-in-out",
                };

                return (
                  <div
                    key={originalIndex}
                    ref={(el) => {
                      imageRefs.current[originalIndex] = el;
                    }}
                    data-index={originalIndex}
                    style={imageContainerStyle}
                    onClick={() => openCarousel(originalIndex)}
                    onMouseEnter={(e) => {
                      const wrapper = e.currentTarget.querySelector(
                        ".image-wrapper"
                      ) as HTMLElement;
                      const img = e.currentTarget.querySelector(
                        ".main-image"
                      ) as HTMLElement;
                      const overlay = e.currentTarget.querySelector(
                        ".overlay"
                      ) as HTMLElement;
                      const shimmer = e.currentTarget.querySelector(
                        ".shimmer"
                      ) as HTMLElement;

                      if (wrapper)
                        Object.assign(wrapper.style, imageWrapperHoverStyle);
                      if (img) img.style.transform = "scale(1.1)";
                      if (overlay) overlay.style.opacity = "1";
                      if (shimmer) shimmer.style.transform = "translateX(100%)";
                    }}
                    onMouseLeave={(e) => {
                      const wrapper = e.currentTarget.querySelector(
                        ".image-wrapper"
                      ) as HTMLElement;
                      const img = e.currentTarget.querySelector(
                        ".main-image"
                      ) as HTMLElement;
                      const overlay = e.currentTarget.querySelector(
                        ".overlay"
                      ) as HTMLElement;
                      const shimmer = e.currentTarget.querySelector(
                        ".shimmer"
                      ) as HTMLElement;

                      if (wrapper) wrapper.style.transform = "scale(1)";
                      if (img) img.style.transform = "scale(1.02)";
                      if (overlay) overlay.style.opacity = "0";
                      if (shimmer)
                        shimmer.style.transform = "translateX(-100%)";
                    }}
                  >
                    <div className="image-wrapper" style={imageWrapperStyle}>
                      <div
                        style={{
                          position: "relative",
                          lineHeight: 0,
                          fontSize: 0,
                        }}
                      >
                        <Image
                          src={image.url}
                          alt={`Image de mode ${originalIndex + 1}`}
                          width={width}
                          height={height}
                          className="main-image"
                          style={imageStyle}
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={originalIndex < 6}
                          loading={originalIndex < 6 ? "eager" : "lazy"}
                        />

                        {/* Overlay avec effet de mode */}
                        <div className="overlay" style={overlayStyle} />

                        {/* Effet de brillance au survol */}
                        <div className="shimmer" style={shimmerStyle} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Carrousel Modal */}
      <div style={modalOverlayStyle} onClick={closeCarousel}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          {selectedImageIndex !== null && (
            <>
              <Image
                src={images[selectedImageIndex].url}
                alt={`Image de mode ${selectedImageIndex + 1}`}
                width={parseInt(images[selectedImageIndex].width)}
                height={parseInt(images[selectedImageIndex].height)}
                style={modalImageStyle}
                priority
              />

              {/* Bouton précédent */}
              <button
                style={{ ...buttonStyle, left: "20px" }}
                onClick={goToPrevious}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
              >
                ‹
              </button>

              {/* Bouton suivant */}
              <button
                style={{ ...buttonStyle, right: "20px" }}
                onClick={goToNext}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
              >
                ›
              </button>

              {/* Bouton fermer */}
              <button
                style={closeButtonStyle}
                onClick={closeCarousel}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
              >
                ×
              </button>

              {/* Compteur */}
              <div style={counterStyle}>
                {selectedImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PicturesGrid;
