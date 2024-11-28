"use client";

import themeVariables from "@/utils/themeVariables";
import { Horse } from "@prisma/client";
import { FlameIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HorsePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [horse, setHorse] = useState<Horse | null>(null);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      horseId: id,
    });
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/horses?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.error(`Error fetching horse - err ${res.status}`);
          setError(`Error fetching horse - err ${res.status}`);
        }
        return res.json();
      })
      .then((data: Horse) => {
        setHorse(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching horse:", error);
        setError(`Error fetching horse - err: ${error}`);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 5rem)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "90%",
          height: "100%",
          backgroundColor: themeVariables.grassGreen,
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          overflow: "hidden",
        }}
      >
        {loading && (
          <LoaderCircle
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "spin 1s linear infinite",
            }}
            color={themeVariables.neutralEarth}
            size={64}
          />
        )}
        {error && (
          <>
            <FlameIcon /> <p>{error}</p>
          </>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "40%",
            width: "70%",
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translate(-50%, 0%)",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: themeVariables.lightForeground,
              color: themeVariables.corporateBlue,
            }}
          >
            <h1>CHACCO MACCO</h1>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              backgroundColor: themeVariables.neutralEarth,
              color: themeVariables.darkForeground,
              flex: "1",
            }}
          >
            <p>FATHER: CHACCO BLUE</p>
            <p>MOTHER: CASSINI I</p>
            <p>GRANDMOTHER: ELVISTER PUTTE</p>
            <p>SEX: MALE</p>
            <p>STUDBOOK: ZANGERSHEIDE</p>
            {horse?.birthday && (
              <p>
                AGE:{" "}
                {new Date().getFullYear() -
                  new Date(horse.birthday).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
