import React, { useState, CSSProperties } from "react";
import Image from "next/image";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  style?: CSSProperties;
  priority?: boolean;
}

export default function ImagePlaceholder({
  src,
  alt,
  style,
  priority = false,
}: ImagePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(229, 231, 235, 0.7)",
            backdropFilter: "blur(5px)",
            zIndex: 1,
          }}
        >
          <div
            className="loader"
            style={{
              width: "30px",
              height: "30px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoad={() => setIsLoading(false)}
      />

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
