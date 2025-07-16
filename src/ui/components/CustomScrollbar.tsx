import React, { CSSProperties, ReactNode, useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import themeVariables from "@/utils/themeVariables";

interface CustomScrollbarProps {
  children: ReactNode;
  style?: CSSProperties;
  height?: string | number;
  thumbColor?: string;
  trackColor?: string;
  thumbOpacity?: number;
  thumbWidth?: number;
  autoHide?: boolean;
  thumbSize?: number;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  style,
  height = "100%",
  thumbColor = themeVariables.cloudyMist,
  trackColor = "rgba(0, 0, 0, 0)",

  thumbOpacity = 1,
  thumbWidth = 12,
  autoHide = true,
  thumbSize = 120,
}) => {
  // État pour gérer l'auto-hide de la scrollbar
  const [shouldAutoHide, setShouldAutoHide] = useState(false);

  // Effet pour passer autoHide à true après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAutoHide(true);
    }, 3000); // 3 secondes

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);
  // Personnalisation des composants de la scrollbar
  const renderThumb = ({
    style,
    ...props
  }: {
    style?: CSSProperties;
    [key: string]: any;
  }) => {
    const thumbStyle = {
      backgroundColor: thumbColor,
      borderRadius: "7px",
      opacity: thumbOpacity,
      width: `${thumbWidth}px !important`,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrack = ({
    style,
    ...props
  }: {
    style?: CSSProperties;
    [key: string]: any;
  }) => {
    const trackStyle = {
      backgroundColor: trackColor,
      borderRadius: "7px",
      border: `1px solid ${themeVariables.cloudyMist}`,
      right: "10px",
      width: `${thumbWidth}px`,
      height: "100%",
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <Scrollbars
      style={{ height, ...style }}
      renderThumbVertical={renderThumb}
      renderTrackVertical={renderTrack}
      universal={true}
      autoHide={shouldAutoHide && autoHide}
      thumbSize={thumbSize}
    >
      <div style={{ padding: "20px" }}>{children}</div>
    </Scrollbars>
  );
};

export default CustomScrollbar;
