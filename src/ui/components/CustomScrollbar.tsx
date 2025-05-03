import React, { CSSProperties, ReactNode } from "react";
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
  thumbColor = themeVariables.lightForeground,
  trackColor = "rgba(0, 0, 0, 0.2)",
  thumbOpacity = 1,
  thumbWidth = 12,
  autoHide = false,
  thumbSize = 120,
}) => {
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
      borderRadius: "4px",
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
      borderRadius: "4px",
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
      autoHide={autoHide}
      thumbSize={thumbSize}
    >
      <div style={{ padding: "20px" }}>{children}</div>
    </Scrollbars>
  );
};

export default CustomScrollbar;
