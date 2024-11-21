"use client";

import themeVariables from "@/utils/themeVariables";
import { Horse } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Horses({ locale }: { locale: string }) {
  const [loading, setLoading] = useState(true);
  const [horses, sethorses] = useState<Horse[]>([]);
  const [error, setError] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [take, setTake] = useState(10);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      searchParam,
      language: locale,
      take: take.toString(),
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
          setError(`Error fetching horses - err ${res.status}`);
        }
        return res.json();
      })
      .then((data: Horse[]) => sethorses(data))
      .catch((error) => console.error("Error fetching horses:", error));
    setLoading(false);
  }, [locale, searchParam, take]);
  if (loading) {
    return (
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
    );
  } else if (error) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: themeVariables.warning,
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="hide-scrollbar"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        gap: "20px",
        flexWrap: "wrap",
        height: "fill-available",
        paddingTop: "5rem",
        overflowY: "scroll",
      }}
    >
      <h1
        style={{
          position: "fixed",
          top: "6rem",
        }}
      >
        {locale === "en" ? "Horses" : "Chevaux"}
      </h1>
      {horses.map((horse) => (
        <div
          className="card"
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            backgroundColor: themeVariables.cloudyMist,
            border: "1px solid #000",
            borderRadius: "5px",
            width: "20rem",
            height: "10rem",
            overflow: "hidden",
            transition: "ease-in-out 2s",
          }}
          key={horse.id}
          onClick={() => {
            router.push(`/${locale}/horses/${horse.id}`);
          }}
        >
          <h2>{horse.name}</h2>
          {locale === "en" ? (
            <p>{horse.englishDescription}</p>
          ) : (
            <p>{horse.frenchDescription}</p>
          )}
        </div>
      ))}
    </div>
  );
}
