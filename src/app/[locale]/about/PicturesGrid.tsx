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
  const [isClient, setIsClient] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gestion du scroll et des boutons de navigation
  useEffect(() => {
    const updateScrollState = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setScrollPosition(scrollLeft);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", updateScrollState);
      updateScrollState(); // Initial check
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", updateScrollState);
      }
    };
  }, [isClient]);

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

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (!isClient) {
    return <div style={{ width: "100%", height: "400px" }} />; // Placeholder pendant l'hydratation
  }

  const containerStyle: CSSProperties = {
    width: "100%",
    padding: "48px 16px",
    position: "relative",
    maxHeight: "70vh",
    overflow: "hidden",
  };

  const sliderWrapperStyle: CSSProperties = {
    position: "relative",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const sliderStyle: CSSProperties = {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    paddingBottom: "16px",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE
  };

  // Styles CSS pour masquer les scrollbars
  const globalStyles = `
    .slider-container::-webkit-scrollbar {
      display: none;
    }
    .slider-container {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const imageContainerStyle: CSSProperties = {
    flexShrink: 0,
    height: "300px",
    position: "relative",
    cursor: "pointer",
    transition: "transform 500ms ease, box-shadow 500ms ease",
    overflow: "hidden",
  };

  const navigationButtonStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "all 300ms ease",
    zIndex: 10,
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
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalImageStyle: CSSProperties = {
    maxWidth: "90vw",
    maxHeight: "90vh",
    objectFit: "contain",
    transform: "scale(1.05)",
    border: "none",
    outline: "none",
    margin: 0,
    padding: 0,
    verticalAlign: "top",
    display: "block",
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
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div style={containerStyle}>
        <div style={sliderWrapperStyle}>
          {/* Bouton de navigation gauche */}
          {canScrollLeft && (
            <button
              style={{ ...navigationButtonStyle, left: "10px" }}
              onClick={scrollLeft}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 1)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ‹
            </button>
          )}

          {/* Slider des images */}
          <div ref={sliderRef} className="slider-container" style={sliderStyle}>
            {images.map((image, index) => {
              // Calculer la largeur proportionnelle pour une hauteur de 300px
              const originalWidth = parseInt(image.width);
              const originalHeight = parseInt(image.height);
              const aspectRatio = originalWidth / originalHeight;
              const normalizedWidth = Math.round(300 * aspectRatio);

              const imageStyle: CSSProperties = {
                width: `${normalizedWidth}px`,
                height: "300px",
                objectFit: "cover",
                transition: "transform 700ms ease",
                transform: "scale(1.05)",
                display: "block",
                border: "none",
                outline: "none",
                margin: 0,
                padding: 0,
              };

              const overlayStyle: CSSProperties = {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
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
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
                transform: "translateX(-100%)",
                transition: "transform 1000ms ease-in-out",
              };

              return (
                <div
                  key={index}
                  style={{
                    ...imageContainerStyle,
                    width: `${normalizedWidth}px`,
                  }}
                  onClick={() => openCarousel(index)}
                  onMouseEnter={(e) => {
                    const container = e.currentTarget;
                    const img = container.querySelector(
                      ".main-image"
                    ) as HTMLElement;
                    const overlay = container.querySelector(
                      ".overlay"
                    ) as HTMLElement;
                    const shimmer = container.querySelector(
                      ".shimmer"
                    ) as HTMLElement;

                    container.style.transform = "scale(1)";
                    container.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.3)";
                    if (img) img.style.transform = "scale(1.1)";
                    if (overlay) overlay.style.opacity = "1";
                    if (shimmer) shimmer.style.transform = "translateX(100%)";
                  }}
                  onMouseLeave={(e) => {
                    const container = e.currentTarget;
                    const img = container.querySelector(
                      ".main-image"
                    ) as HTMLElement;
                    const overlay = container.querySelector(
                      ".overlay"
                    ) as HTMLElement;
                    const shimmer = container.querySelector(
                      ".shimmer"
                    ) as HTMLElement;

                    container.style.transform = "scale(1)";
                    container.style.boxShadow =
                      "0 10px 25px rgba(0, 0, 0, 0.1)";
                    if (img) img.style.transform = "scale(1.05)";
                    if (overlay) overlay.style.opacity = "0";
                    if (shimmer) shimmer.style.transform = "translateX(-100%)";
                  }}
                >
                  <Image
                    src={image.url}
                    alt={`Photo de mode ${
                      index + 1
                    } - Collection Les Deux Grises`}
                    width={normalizedWidth}
                    height={300}
                    className="main-image"
                    style={imageStyle}
                    sizes={`${normalizedWidth}px`}
                    priority={index < 6}
                    loading={index < 6 ? "eager" : "lazy"}
                    quality={75}
                  />

                  {/* Overlay avec effet de mode */}
                  <div className="overlay" style={overlayStyle} />

                  {/* Effet de brillance au survol */}
                  <div className="shimmer" style={shimmerStyle} />
                </div>
              );
            })}
          </div>

          {/* Bouton de navigation droite */}
          {canScrollRight && (
            <button
              style={{ ...navigationButtonStyle, right: "10px" }}
              onClick={scrollRight}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 1)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* Carrousel Modal */}
      <div style={modalOverlayStyle} onClick={closeCarousel}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          {selectedImageIndex !== null && (
            <>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src={images[selectedImageIndex].url}
                  alt={`Photo de mode ${
                    selectedImageIndex + 1
                  } - Collection Les Deux Grises`}
                  width={parseInt(images[selectedImageIndex].width)}
                  height={parseInt(images[selectedImageIndex].height)}
                  style={modalImageStyle}
                  priority
                />
              </div>

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
