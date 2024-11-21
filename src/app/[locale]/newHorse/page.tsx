"use client";

import themeVariables from "@/utils/themeVariables";
import { Button } from "@mui/material";
import { Eye, EyeClosed, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function NewHorsePage() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [frenchDescription, setFrenchDescription] = useState("");
  const [englishDescription, setEnglishDescription] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [pwdHiden, setPwdHiden] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/horses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        birthday,
        frenchDescription,
        englishDescription,
        keywords,
        links,
        images,
        adminPassword,
      }),
    });
    if (res.ok) {
      toast.success("Horse created successfully");
    } else {
      toast.error(`Error creating horse ${res.status}`, { duration: 5000 });
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
          New Horse
        </h1>

        <label
          style={{
            textAlign: "center",
          }}
        >
          Name :{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label
          style={{
            textAlign: "center",
          }}
        >
          Birthday :{" "}
          <input
            type="date"
            value={birthday ? birthday.toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setBirthday(e.target.value ? new Date(e.target.value) : null)
            }
          />
        </label>
        <label
          style={{
            textAlign: "center",
          }}
        >
          frenchDescription :{" "}
        </label>
        <textarea
          value={frenchDescription}
          onChange={(e) => setFrenchDescription(e.target.value)}
        />
        <label
          style={{
            textAlign: "center",
          }}
        >
          englishDescription :{" "}
        </label>
        <textarea
          value={englishDescription}
          onChange={(e) => setEnglishDescription(e.target.value)}
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
