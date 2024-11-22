"use client";

import themeVariables from "@/utils/themeVariables";
import { Card } from "@mui/material";
import { Article } from "@prisma/client";
import { FlameIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ArticlePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      articleId: id,
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
          console.error(`Error fetching horse - err ${res.status}`);
          setError(`Error fetching horse - err ${res.status}`);
        }
        return res.json();
      })
      .then((data: Article) => {
        setArticle(data);
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
        padding: "1rem",
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
      <Card>
        <h1>{article?.title}</h1>
        <h2>{article?.language}</h2>

        <p>{article?.content}</p>
      </Card>
    </div>
  );
}
