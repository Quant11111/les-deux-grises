"use client";

import { rawengulkDemibold } from "@/app/fonts/fonts";
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
        className="arc-container"
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: "2.5rem",

          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100dvh - 10rem)",
          overflowY: "scroll",
          paddingLeft: "calc(15dvh - 3rem) ",
          paddingRight: "calc(15dvh - 3rem) ",
          paddingBottom: "calc((100dvh - 10rem)*7/100) ",
          gap: "0.5rem",
          maxWidth: "calc(200dvh - 32rem)",
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
            transform: toogle ? "translateX(0)" : "translateX(-50%)",
            transition: "ease-in-out 0.5s",
          }}
        >
          <div
            className="bg1"
            style={{
              position: "relative",
              backgroundImage: "url('/images/domain.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "50%",
              height: "100%",
            }}
          >
            <div
              className="divc"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                position: "absolute",
                width: "300px",
                maxWidth: "75vw",
                height: "350px",
                maxHeight: "55%",
                bottom: "5%",
                left: "20%",
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
                className={rawengulkDemibold.className}
                style={{
                  fontSize: "0.7rem",
                }}
              >
                {content1}
              </p>
            </div>
          </div>
          <div
            className="bg2"
            style={{
              position: "relative",
              backgroundImage: "url('/images/cloture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "50%",
              height: "100%",
            }}
          >
            <div
              className="divc"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                position: "absolute",
                width: "300px",
                maxWidth: "75vw",
                height: "350px",
                maxHeight: "55%",
                bottom: "5%",
                left: "20%",
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
                className={rawengulkDemibold.className}
                style={{
                  fontSize: "0.7rem",
                }}
              >
                {content2}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
      <style jsx>{`
        p {
          text-align: justify;
        }
        .divc {
          justify-content: space-around !important;
        }
        .radio-label {
          cursor: pointer;
          font-size: 0.7rem;
        }
        @media (max-width: 560px) {
          .divc {
            left: 7.5vw !important;
            width: 65vw !important;
            height: 50dvh !important;
            bottom: 7.5vw !important;
          }
        }
        @media (max-width: 1100px) {
          .about-radios {
            width: 100%;
            flex-direction: column;
            align-items: end !important;
            gap: 0.5rem !important;
            margin-right: 4rem !important;
            margin-top: 1rem !important;
          }
          .arc-container {
            overflow: hidden !important;
          }
          .divc {
            overflow: scroll !important;
          }
        }
        @media (min-width: 1100px) {
          .divc {
            padding: max(calc(1.2vw / 0.85), 1.5rem) !important;
            overflow: scroll !important;
          }
          h1 {
            font-size: max(calc(1.5vw / 0.85), 1.5rem) !important;
          }
          p {
            font-size: max(calc(0.7vw / 0.85), 0.7rem) !important;
          }
        }
        @media (min-width: 1500px) {
          .divc {
            width: max(calc(23vw / 0.85), 450px) !important;
            height: 50dvh !important;
          }
        }
      `}</style>
    </div>
  );
}
