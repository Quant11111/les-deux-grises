"use client";

import themeVariables from "@/utils/themeVariables";
import { useState } from "react";
import Modal from "./Modal";

export default function ContactSection({ locale }: { locale: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = (email: string) => {
    // Fonction pour valider l'ajout d'un email (à implémenter)
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "calc(100dvh - 5rem)",
        height: "calc(100dvh - 5rem)",
        overflowY: "scroll",
        backgroundColor: themeVariables.grassGreen,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: themeVariables.grassGreen,
          gap: "2rem",
          paddingTop: "2rem",
          zIndex: 50,
          minWidth: "100%",
        }}
      >
        <h1 style={{ color: themeVariables.cloudyMist }}>
          {locale === "en" ? "Contact Us" : "Contactez-nous"}
        </h1>
        <p style={{ color: themeVariables.cloudyMist }}>
          {locale === "en"
            ? "Email: contact@example.com"
            : "Email : contact@example.com"}
        </p>
        <p style={{ color: themeVariables.cloudyMist }}>
          {locale === "en"
            ? "Phone: +123 456 7890"
            : "Téléphone : +123 456 7890"}
        </p>
        <p style={{ color: themeVariables.cloudyMist }}>
          {locale === "en"
            ? "Address: 123 Horse Street, Equine City"
            : "Adresse : 123 rue des Chevaux, Ville Équine"}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "1rem 2rem",
            backgroundColor: themeVariables.neutralEarth,
            color: themeVariables.cloudyMist,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {locale === "en"
            ? "Subscribe to Newsletter"
            : "S'inscrire à la newsletter"}
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div
            style={{
              padding: "2rem",
              backgroundColor: themeVariables.grassGreen,
            }}
          >
            <h2 style={{ color: themeVariables.cloudyMist }}>
              {locale === "en"
                ? "Subscribe to our Newsletter"
                : "Inscrivez-vous à notre newsletter"}
            </h2>
            <input
              type="email"
              placeholder={
                locale === "en" ? "Enter your email" : "Entrez votre email"
              }
              style={{
                padding: "0.5rem",
                margin: "1rem 0",
                width: "100%",
                borderRadius: "5px",
                border: `1px solid ${themeVariables.neutralEarth}`,
              }}
            />
            <button
              onClick={() => handleSubscribe("")}
              style={{
                padding: "1rem 2rem",
                backgroundColor: themeVariables.neutralEarth,
                color: themeVariables.cloudyMist,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {locale === "en" ? "Subscribe" : "S'inscrire"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
