"use client";

import themeVariables from "@/utils/themeVariables";
import { Article } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function News({ locale }: { locale: string }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [take, setTake] = useState(10);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      searchParam,
      language: locale,
      take: take.toString(),
    });

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          setError(`Error fetching articles - err ${res.status}`);
        }
        return res.json();
      })
      .then((data: Article[]) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
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
        News
      </h1>
      {articles.map((article) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            backgroundColor: themeVariables.cloudyMist,
            border: "1px solid #000",
            borderRadius: "5px",
            width: "20rem",
            height: "10rem",
            overflow: "hidden",
          }}
          key={article.id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>{article.title}</h2>
            <h3>{article.language}</h3>
          </div>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}
