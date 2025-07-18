"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import images from "./images.json";

// Nouveaux composants d'icônes
const FlecheGauche = () => (
  <svg viewBox="0 0 64.89 75.65" width="24" height="24" fill="none">
    <path
      d="M37.83,75.65h27.06V0h-27.06C16.94,0,0,16.94,0,37.83h0c0,20.89,16.94,37.83,37.83,37.83ZM38.2,24.65c.71-.71,1.86-.71,2.57,0,.71.71.71,1.86,0,2.57l-12.41,12.41,12.41,12.41c.71.71.71,1.86,0,2.57h0c-.71.71-1.86.71-2.57,0l-14.96-14.96h0s0-.02,0-.02l14.96-14.96Z"
      fill="#ece3cd"
    />
  </svg>
);

const FlecheDroite = () => (
  <svg viewBox="0 0 64.89 75.65" width="24" height="24" fill="none">
    <path
      d="M27.06,0H0v75.65h27.06c20.89,0,37.83-16.94,37.83-37.83h0C64.89,16.94,47.95,0,27.06,0ZM26.68,51c-.71.71-1.86.71-2.57,0-.71-.71-.71-1.86,0-2.57l12.41-12.41-12.41-12.41c-.71-.71-.71-1.86,0-2.57h0c.71-.71,1.86-.71,2.57,0l14.96,14.96h0s0,.02,0,.02l-14.96,14.96Z"
      fill="#ece3cd"
    />
  </svg>
);

const CroixFermeture = () => (
  <svg viewBox="0 0 34.84 34.84" width="24" height="24" fill="none">
    <rect
      x="15.18"
      y="-6.29"
      width="4.48"
      height="47.41"
      rx="2.24"
      ry="2.24"
      transform="translate(17.42 -7.22) rotate(45)"
      fill="#ece3cd"
    />
    <rect
      x="15.18"
      y="-6.29"
      width="4.48"
      height="47.41"
      rx="2.24"
      ry="2.24"
      transform="translate(42.05 17.42) rotate(135)"
      fill="#ece3cd"
    />
  </svg>
);

interface ImageData {
  url: string;
  width: string;
  height: string;
}

// Styled Components
const Container = styled.div`
  width: 100%;
  padding: 48px 16px;
  position: relative;
  max-height: 70vh;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
`;

const Slider = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding-bottom: 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.$side}: 10px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 300ms ease;
  z-index: 10;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const ImageContainer = styled.div<{ $width: number }>`
  flex-shrink: 0;
  width: ${(props) => props.$width}px;
  height: 300px;
  position: relative;
  cursor: pointer;
  transition: transform 500ms ease, box-shadow 500ms ease;
  overflow: hidden;

  &:hover {
    transform: scale(1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .main-image {
      transform: scale(1.1);
    }

    .overlay {
      opacity: 1;
    }

    .shimmer {
      transform: translateX(100%);
    }
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 700ms ease;
  transform: scale(1.05);
  display: block;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  opacity: 0;
  transition: opacity 500ms ease;
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 1000ms ease-in-out;
`;

const ModalOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transition: opacity 300ms ease, visibility 300ms ease;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ModalImage = styled(Image)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  transform: scale(1.05);
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  display: block;
`;

const ModalButton = styled.button<{ $side: "left" | "right" }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  transform: scale(1.5);
  ${(props) => props.$side}: 20px;
  background-color: transparent;
  border: none;
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 300ms ease;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 300ms ease;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Counter = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  z-index: 1001;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 400px;
`;

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
      updateScrollState();
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
    return <Placeholder />;
  }

  return (
    <>
      <Container>
        <SliderWrapper>
          {/* Bouton de navigation gauche */}
          {canScrollLeft && (
            <NavigationButton $side="left" onClick={scrollLeft}>
              <FlecheGauche />
            </NavigationButton>
          )}

          {/* Slider des images */}
          <Slider ref={sliderRef}>
            {images.map((image, index) => {
              // Calculer la largeur proportionnelle pour une hauteur de 300px
              const originalWidth = parseInt(image.width);
              const originalHeight = parseInt(image.height);
              const aspectRatio = originalWidth / originalHeight;
              const normalizedWidth = Math.round(300 * aspectRatio);

              return (
                <ImageContainer
                  key={index}
                  $width={normalizedWidth}
                  onClick={() => openCarousel(index)}
                >
                  <StyledImage
                    src={image.url}
                    alt={`Photo de mode ${
                      index + 1
                    } - Collection Les Deux Grises`}
                    width={normalizedWidth}
                    height={300}
                    className="main-image"
                    sizes={`${normalizedWidth}px`}
                    priority={index < 6}
                    loading={index < 6 ? "eager" : "lazy"}
                    quality={75}
                  />
                  <Overlay className="overlay" />
                  <Shimmer className="shimmer" />
                </ImageContainer>
              );
            })}
          </Slider>

          {/* Bouton de navigation droite */}
          {canScrollRight && (
            <NavigationButton $side="right" onClick={scrollRight}>
              <FlecheDroite />
            </NavigationButton>
          )}
        </SliderWrapper>
      </Container>

      {/* Carrousel Modal */}
      <ModalOverlay
        $visible={selectedImageIndex !== null}
        onClick={closeCarousel}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {selectedImageIndex !== null && (
            <>
              <ModalImageContainer>
                <ModalImage
                  src={images[selectedImageIndex].url}
                  alt={`Photo de mode ${
                    selectedImageIndex + 1
                  } - Collection Les Deux Grises`}
                  width={parseInt(images[selectedImageIndex].width)}
                  height={parseInt(images[selectedImageIndex].height)}
                  priority
                />
              </ModalImageContainer>

              <ModalButton $side="left" onClick={goToPrevious}>
                <FlecheGauche />
              </ModalButton>

              <ModalButton $side="right" onClick={goToNext}>
                <FlecheDroite />
              </ModalButton>

              <CloseButton onClick={closeCarousel}>
                <CroixFermeture />
              </CloseButton>

              <Counter>
                {selectedImageIndex + 1} / {images.length}
              </Counter>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default PicturesGrid;
