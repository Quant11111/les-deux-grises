"use client";

import themeVariables from "@/utils/themeVariables";
import { useState } from "react";
import Modal from "./Modal";
import { toast, Toaster } from "sonner";
import { useTranslations } from "next-intl";
import { rawengulkLight } from "@/app/fonts/fonts";
import Link from "next/link";

export default function ContactSection({ locale }: { locale: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebDevOpen, setIsWebDevOpen] = useState(false);
  const t = useTranslations("contact");

  const handleSubscribe = (email: string) => {
    // Fonction pour valider l'ajout d'un email (à implémenter)
  };

  const contactInfo = {
    email: "contact@lesdeuxgrises.com",
    phone: "+33 6 12 34 56 78",
    address: "123 rue des Arts, 75001 Paris, France",
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copié !`);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100dvh - 5rem)",
        display: "flex",
        paddingTop: "1rem",
        flexDirection: "column",
        paddingBottom: "4vw",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "2.5rem",
          paddingTop: "3rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/images/balancoire.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",

          overflowY: "scroll",

          overflowX: "hidden",
          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100dvh - 10rem)",

          maxWidth: "calc(200dvh - 32rem)",
        }}
      >
        <div
          className="contact-section-content"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: themeVariables.lightForeground,
              textAlign: "center",
            }}
          >
            {t("title")}
          </h2>
          {/*           <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "2px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          /> */}
          <button
            onClick={() => copyToClipboard(contactInfo.email, "Email")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              padding: "1rem 2rem",
              wordBreak: "break-all",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s, color 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#10504F";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "initial";
            }}
          >
            {contactInfo.email}
          </button>
          <button
            onClick={() =>
              copyToClipboard(contactInfo.phone, "Numéro de téléphone")
            }
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              padding: "1rem 2rem",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s, color 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#10504F";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "initial";
            }}
          >
            {contactInfo.phone}
          </button>
          <button
            className="button-copy"
            onClick={() => copyToClipboard(contactInfo.address, "Adresse")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              padding: "1rem 2rem",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s, color 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#10504F";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "initial";
            }}
          >
            {contactInfo.address}
          </button>
          {/*           <div
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "2px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <button
                onClick={() => setIsWebDevOpen(!isWebDevOpen)}
                style={{
                  backgroundColor: themeVariables.grassGreen,
                  padding: "1rem 2rem",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: themeVariables.lightForeground,
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = themeVariables.secondaryGlow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = themeVariables.lightForeground;
                }}
              >
                <span>{t("webdev")}</span>
                <span>{isWebDevOpen ? "▲" : "▼"}</span>
              </button>

              {isWebDevOpen && (
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  }}
                >
                  <p
                    className={rawengulkLight.className}
                    style={{ textAlign: "center" }}
                  >
                    {t("webdevMessage")}
                  </p>
                  <Link
                    href="https://www.thefrenchbaguettes.com"
                    style={{
                      backgroundColor: themeVariables.grassGreen,
                      color: themeVariables.lightForeground,
                      padding: "0.75rem 1.5rem",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease, color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#0a3836";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        themeVariables.grassGreen;
                    }}
                  >
                    {t("webdevButton")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
      <style jsx>{`
        @media (max-width: 1100px) {
          button {
            font-size: 0.9rem !important;
          }
        }
        @media (max-width: 800px) {
          .contact-section-content {
            gap: 0.5rem !important;
          }
          .title {
            font-size: 1.2rem !important;
          }
          button {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
