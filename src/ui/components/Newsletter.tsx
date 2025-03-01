"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BellIcon, X } from "lucide-react";
import { IconButton } from "@mui/material";

export default function Newsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const t = useTranslations("newsletter");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'inscription à la newsletter
    setIsOpen(false);
    setEmail("");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="notification-button">
        <div className="notification-icon">
          <BellIcon />
          <span className="notification-badge">1</span>
        </div>
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <IconButton
              style={{
                position: "absolute",
                borderRadius: "10%",
                top: 0,
                right: 0,
                color: "black",
              }}
              onClick={() => setIsOpen(false)}
              className="modal-close-button"
            >
              <X />
            </IconButton>
            <h2 className="modal-title">{t("title")}</h2>
            <p className="modal-description">{t("description")}</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="email-input"
                required
              />
              <div className="button-container">
                <button type="submit" className="submit-button">
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-button {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          z-index: 50;
          border-radius: 50%;
          padding: 0.2rem;
          cursor: pointer;
        }

        .notification-icon {
          position: relative;
        }

        :global(.bell-icon) {
          height: 2rem;
          width: 2rem;
          color: #1f2937;
        }

        .notification-badge {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          height: 1rem;
          width: 1rem;
          border-radius: 9999px;
          background-color: #ef4444;
          color: white;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-content {
          position: relative;
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          max-width: 28rem;
          width: 100%;
          margin: 0 1rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .modal-description {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }

        .email-input {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .cancel-button {
          padding: 0.5rem 1rem;
          color: #4b5563;
        }

        .cancel-button:hover {
          color: #1f2937;
        }

        .submit-button {
          padding: 0.5rem 1rem;
          background-color: #1f2937;
          color: white;
          border-radius: 0.375rem;
        }

        .submit-button:hover {
          background-color: #374151;
        }
      `}</style>
    </>
  );
}
