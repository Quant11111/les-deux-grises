"use client";

import themeVariables from "@/utils/themeVariables";
import { Button } from "@mui/material";
import { Eye, EyeClosed, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function NewArticlePage() {
  const [language, setLanguage] = useState("en");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [horseNames, setHorseNames] = useState<string[]>([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [pwdHiden, setPwdHiden] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        language,
        keywords,
        links,
        images,
        horseNames,
        adminPassword,
      }),
    });
    if (res.ok) {
      toast.success("Article created successfully");
    } else {
      toast.error(`Error creating article ${res.status}`, { duration: 5000 });
    }
  };

  const addKeyword = (value: string) => {
    if (value !== "") {
      setKeywords((prev) => [...prev, value]);
    }
  };

  const remKeyword = (value: string) => {
    if (value !== "") {
      setKeywords((prev) => prev.filter((keyword) => keyword !== value));
    }
  };

  const addLink = (value: string) => {
    if (value !== "") {
      setLinks((prev) => [...prev, value]);
    }
  };

  const remLink = (value: string) => {
    if (value !== "") {
      setLinks((prev) => prev.filter((link) => link !== value));
    }
  };

  const addImage = (value: string) => {
    if (value !== "") {
      setImages((prev) => [...prev, value]);
    }
  };

  const remImage = (value: string) => {
    if (value !== "") {
      setImages((prev) => prev.filter((image) => image !== value));
    }
  };

  const addHorseName = (value: string) => {
    if (value !== "") {
      setHorseNames((prev) => [...prev, value]);
    }
  };

  const remHorseName = (value: string) => {
    if (value !== "") {
      setHorseNames((prev) => prev.filter((horseName) => horseName !== value));
    }
  };

  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeVariables.cloudyMist,
        padding: "20px",
      }}
    >
      <Toaster />
      <form
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",

          backgroundColor: themeVariables.coolBlueGrey,
          padding: "20px",
          borderRadius: themeVariables.borderRadius,
          boxShadow: `0 0 20px 20px black`,
        }}
        onSubmit={handleSubmit}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          New Article
        </h1>
        <label
          style={{
            textAlign: "center",
          }}
        >
          Language
          <div>
            <label>
              <input
                type="radio"
                value="English"
                checked={language === "en"}
                onChange={() => {
                  setLanguage("en");
                }}
              />
              English
            </label>{" "}
            <label>
              <input
                type="radio"
                value="French"
                checked={language === "fr"}
                onChange={() => {
                  setLanguage("fr");
                }}
              />
              French
            </label>
          </div>
        </label>

        <label
          style={{
            textAlign: "center",
          }}
        >
          title :{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label
          style={{
            textAlign: "center",
          }}
        >
          content :{" "}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <label
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            add keyword :{" "}
            <input
              type="text"
              id="keyword"
              defaultValue={""}
              placeholder="keyword"
            />
            <button
              type="button"
              onClick={() =>
                addKeyword(
                  (document.getElementById("keyword") as HTMLInputElement).value
                )
              }
            >
              add
            </button>
          </label>
          <label
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            add Horse Name :{" "}
            <input
              type="text"
              id="horseName"
              defaultValue={""}
              placeholder="horseName"
            />
            <button
              type="button"
              onClick={() =>
                addHorseName(
                  (document.getElementById("horseName") as HTMLInputElement)
                    .value
                )
              }
            >
              add
            </button>
          </label>
          <label
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            add image :{" "}
            <input
              type="text"
              id="image"
              defaultValue={""}
              placeholder="image link"
            />
            <button
              type="button"
              onClick={() =>
                addImage(
                  (document.getElementById("image") as HTMLInputElement).value
                )
              }
            >
              add
            </button>
          </label>
          <label
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            add link :{" "}
            <input type="text" id="link" defaultValue={""} placeholder="link" />
            <button
              type="button"
              onClick={() =>
                addLink(
                  (document.getElementById("link") as HTMLInputElement).value
                )
              }
            >
              add
            </button>
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <h2>Keywords</h2>
            <ul>
              {keywords.map((keyword) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  key={keyword}
                >
                  {keyword}{" "}
                  <Trash2Icon
                    style={{
                      cursor: "pointer",
                      color: themeVariables.darkForeground,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = themeVariables.warning)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        themeVariables.darkForeground)
                    }
                    onClick={() => remKeyword(keyword)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Horse Names</h2>
            <ul>
              {horseNames.map((horseName) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  key={horseName}
                >
                  {horseName}{" "}
                  <Trash2Icon
                    style={{
                      cursor: "pointer",
                      color: themeVariables.darkForeground,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = themeVariables.warning)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        themeVariables.darkForeground)
                    }
                    onClick={() => remHorseName(horseName)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              width: "25%",
              overflow: "hidden",
            }}
          >
            <h2>Images</h2>
            <ul>
              {images.map((image) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  key={image}
                >
                  {image}{" "}
                  <Trash2Icon
                    style={{
                      cursor: "pointer",
                      color: themeVariables.darkForeground,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = themeVariables.warning)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        themeVariables.darkForeground)
                    }
                    onClick={() => remImage(image)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Links</h2>
            <ul>
              {links.map((link) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  key={link}
                >
                  {link}{" "}
                  <Trash2Icon
                    style={{
                      cursor: "pointer",
                      color: themeVariables.darkForeground,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = themeVariables.warning)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        themeVariables.darkForeground)
                    }
                    onClick={() => remLink(link)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          Admin Password :{" "}
          <input
            type="password"
            id="password"
            aria-hidden={pwdHiden}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          {pwdHiden ? (
            <EyeClosed
              style={{
                cursor: "pointer",
                color: themeVariables.darkForeground,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = themeVariables.lightForeground)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = themeVariables.darkForeground)
              }
              onClick={() => setPwdHiden(false)}
            />
          ) : (
            <Eye
              style={{
                cursor: "pointer",
                color: themeVariables.darkForeground,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = themeVariables.lightForeground)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = themeVariables.darkForeground)
              }
              onClick={() => setPwdHiden(true)}
            />
          )}
        </label>

        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
            backgroundColor: themeVariables.grassGreen,
            color: themeVariables.lightForeground,
            "&:hover": {
              color: themeVariables.darkForeground,
              backgroundColor: themeVariables.cloudyMist,
            },
          }}
        >
          Submit
        </Button>
      </form>
    </main>
  );
}
