"use client";

import themeVariables from "@/utils/themeVariables";
import { useState } from "react";
import Modal from "./Modal";
import { toast, Toaster } from "sonner";

export default function ContactSection({ locale }: { locale: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          alignItems: "center",
          backgroundImage: "url('/images/balancoire.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",

          overflowY: "scroll",
          padding: "6rem",
          paddingTop: "20vw",
          overflowX: "hidden",
          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100dvh - 10rem)",

          paddingLeft: "calc(15dvh - 3rem) ",
          paddingRight: "calc(15dvh - 3rem) ",
          paddingBottom: "calc((100dvh - 10rem)*7/100) ",

          maxWidth: "calc(200dvh - 32rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={() => copyToClipboard(contactInfo.email, "Email")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {contactInfo.email}
          </button>
          <button
            onClick={() =>
              copyToClipboard(contactInfo.phone, "Numéro de téléphone")
            }
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {contactInfo.phone}
          </button>
          <button
            className="button-copy"
            onClick={() => copyToClipboard(contactInfo.address, "Adresse")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "400px",
              fontSize: "1rem",
              transition: "transform 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {contactInfo.address}
          </button>
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
          button {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
}
