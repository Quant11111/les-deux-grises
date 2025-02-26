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

  //const context = useAppContext();

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100dvh - 5rem)",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "4vw",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="about-radios"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: themeVariables.grassGreen,
          gap: "2rem",

          minWidth: "100%",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="all"
            checked={toogle === true}
            onChange={(e) => setToogle(true)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                toogle === true
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {title1}
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="horse"
            checked={toogle === false}
            onChange={(e) => setToogle(false)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                toogle === false
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {title2}
          </span>
        </label>
      </div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: "2.5rem",

          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100vh - 10rem)",
          overflowY: "scroll",
          paddingLeft: "calc(15vh - 3rem) ",
          paddingRight: "calc(15vh - 3rem) ",
          paddingBottom: "calc((100vh - 10rem)*7/100) ",
          gap: "0.5rem",
          maxWidth: "calc(200vh - 32rem)",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "200%",
            height: "100%",
            top: 0,
            left: 0,
            transform: toogle ? "translateX(0)" : "translateX(-100%)",
            transition: "ease-in-out 0.5s",
          }}
        >
          <div
            className="bg1"
            style={{
              backgroundImage: "url('/images/domain.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "100%",
              height: "100%",
            }}
          />
          <div
            className="bg2"
            style={{
              backgroundImage: "url('/images/cloture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "100%",
              height: "100%",
            }}
          />{" "}
          <div
            className="div1"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              position: "absolute",
              width: "300px",
              maxWidth: "75vw",
              height: "350px",
              maxHeight: "60%",
              bottom: "calc(0.8rem + 1vw)",
              left: "calc(50% - 40%)",
              backgroundColor: "white",
            }}
          >
            <h1
              style={{
                color: `${themeVariables.corporateBlue}`,
                fontSize: "1.5rem",
              }}
            >
              {title1}
            </h1>
            <p
              style={{
                fontSize: "0.7rem",
              }}
            >
              {content1}
            </p>
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
              maxWidth: "75vw",
              height: "350px",
              maxHeight: "60%",
              bottom: "calc(0.8rem + 1vw)",
              left: "calc(150% - 40%)",
              backgroundColor: "white",
            }}
          >
            <h1
              style={{
                color: `${themeVariables.corporateBlue}`,
                fontSize: "1.5rem",
              }}
            >
              {title2}
            </h1>
            <p
              style={{
                fontSize: "0.7rem",
              }}
            >
              {content2}
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .radio-label {
          cursor: pointer;
          font-size: 0.7rem;
        }
        @media (max-width: 560px) {
          .div1 {
            left: 2.5vw !important;
          }
          .div2 {
            left: calc(100% + 2.5vw) !important;
          }
        }
        @media (max-width: 1100px) {
          .about-radios {
            width: 100%;
            flex-direction: column;
            align-items: end !important;
            gap: 0.5rem !important;
            margin-right: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
}
