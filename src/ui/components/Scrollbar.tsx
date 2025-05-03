import React, { useEffect, useRef, useState } from "react";

interface ScrollbarProps {
  parentSelector?: string; // Sélecteur CSS du parent à suivre
  width?: number; // Largeur de la scrollbar
  height?: string | number; // Hauteur de la scrollbar (peut être en % ou px)
  thumbColor?: string; // Couleur de la boule
  opacity?: number; // Opacité des éléments
}

export default function Scrollbar({
  parentSelector = "",
  width = 8,
  height = "100%",
  thumbColor = "white",
  opacity = 0.6,
}: ScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState<number>(40);
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [startThumbPosition, setStartThumbPosition] = useState<number>(0);

  useEffect(() => {
    // Trouver l'élément parent à partir du sélecteur
    const parentElement = parentSelector
      ? (document.querySelector(parentSelector) as HTMLElement)
      : trackRef.current?.parentElement;

    if (!parentElement || !trackRef.current || !thumbRef.current) return;

    // Capturer les références dans des variables locales pour éviter les problèmes de nettoyage
    const currentTrackRef = trackRef.current;
    const currentThumbRef = thumbRef.current;

    // Calculer la taille du thumb en fonction du ratio de la hauteur visible vs la hauteur totale
    const calculateThumbSize = () => {
      const parentHeight = parentElement.clientHeight;
      const parentScrollHeight = parentElement.scrollHeight;
      const ratio = parentHeight / parentScrollHeight;
      const trackHeight = currentTrackRef.clientHeight;
      const newThumbHeight = Math.max(trackHeight * ratio, 30); // Minimum 30px
      setThumbHeight(newThumbHeight);
    };

    // Mettre à jour la position du thumb en fonction du scroll
    const updateThumbPosition = () => {
      const parentHeight = parentElement.clientHeight;
      const parentScrollHeight = parentElement.scrollHeight;
      const scrollTop = parentElement.scrollTop;
      const trackHeight = currentTrackRef.clientHeight;

      // Calculer le ratio de défilement
      const scrollRatio = scrollTop / (parentScrollHeight - parentHeight);
      // Calculer la position maximale du thumb
      const maxThumbPosition = trackHeight - thumbHeight;
      // Mettre à jour la position du thumb
      const newPosition = scrollRatio * maxThumbPosition;
      setThumbPosition(newPosition);
    };

    // Gestionnaire d'événements pour le défilement du parent
    const handleScroll = () => {
      if (!isDragging) {
        updateThumbPosition();
      }
    };

    // Gestionnaire pour le début du glissement du thumb
    const handleThumbMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartY(e.clientY);
      setStartThumbPosition(thumbPosition);
      e.preventDefault();
    };

    // Gestionnaire pour le mouvement lors du glissement
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const trackHeight = currentTrackRef.clientHeight;
      const maxThumbPosition = trackHeight - thumbHeight;

      // Calculer la nouvelle position du thumb
      let newPosition = startThumbPosition + deltaY;
      // Limiter à la plage valide
      newPosition = Math.max(0, Math.min(newPosition, maxThumbPosition));
      setThumbPosition(newPosition);

      // Mettre à jour le défilement du parent
      const parentHeight = parentElement.clientHeight;
      const parentScrollHeight = parentElement.scrollHeight;
      const scrollRatio = newPosition / maxThumbPosition;
      parentElement.scrollTop =
        scrollRatio * (parentScrollHeight - parentHeight);
    };

    // Gestionnaire pour la fin du glissement
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(() => {
      calculateThumbSize();
      updateThumbPosition();
    });

    // Ajouter les écouteurs d'événements
    calculateThumbSize();
    updateThumbPosition();
    parentElement.addEventListener("scroll", handleScroll);
    currentThumbRef.addEventListener("mousedown", handleThumbMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    resizeObserver.observe(parentElement);

    // Nettoyer les écouteurs à la destruction du composant
    return () => {
      parentElement.removeEventListener("scroll", handleScroll);
      currentThumbRef.removeEventListener("mousedown", handleThumbMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      resizeObserver.disconnect();
    };
  }, [
    parentSelector,
    isDragging,
    startY,
    startThumbPosition,
    thumbHeight,
    thumbPosition,
  ]);

  return (

  );
}
