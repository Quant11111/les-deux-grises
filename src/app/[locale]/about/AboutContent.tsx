"use client";

import { useAppContext } from "@/utils/context";
import themeVariables from "@/utils/themeVariables";
import { useState } from "react";
import styled from "styled-components";

const AboutButton = styled.button`
  color: inherit;
  text-decoration: none;
  background: transparent;
  border: none;
  color: ${themeVariables.cloudyMist};
  &:hover {
    text-shadow: currentColor 0 0 1px;
    color: "lightgray";
  }
  cursor: pointer;
`;

export default function AboutContent({
  title1,
  content1,
  title2,
  content2,
}: {
  title1: string;
  content1: string;
  title2: string;
  content2: string;
}) {
  //true : who we are
  //false : what we do
  const [toogle, setToogle] = useState(true);

  const context = useAppContext();

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <div
        className="arc"
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "90%",
          height: "95%",
          left: "5%",
          backgroundImage: "url(/images/domain.jpg)",
          bottom: "0", // Adjust the height as needed
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transform: context?.aboutSub
              ? "translateX(0)"
              : "translateX(-100%)",
            transition: "ease-in-out 0.5s",
          }}
        >
          {" "}
          <div
            className="div1"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              position: "absolute",
              width: "300px",
              height: "350px",
              bottom: "10%",
              left: "20%",
              backgroundColor: "white",
              opacity: "0.5",
            }}
          >
            <h1>{title1}</h1>
            <p>{content1}</p>
          </div>
          <div
            className="div2"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              position: "absolute",
              width: "300px",
              height: "350px",
              bottom: "10%",
              left: "120%",
              backgroundColor: "white",
              opacity: "0.5",
            }}
          >
            <h1>{title2}</h1>
            <p>{content2}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 560px) {
          .div1 {
            left: calc(50% - 150px) !important;
          }
          .div2 {
            left: calc(150% - 150px) !important;
          }
        }
      `}</style>
    </div>
  );
}
