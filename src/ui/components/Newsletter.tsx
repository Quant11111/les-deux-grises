"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BellIcon, X } from "lucide-react";
import { IconButton } from "@mui/material";
import { toast, Toaster } from "sonner";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const t = useTranslations("newsletter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (res.ok) {
      toast.success(t("joinSuccess"));
    } else {
      toast.error(t("joinError"), { duration: 5000 });
    }
    setIsOpen(false);
    setEmail("");
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t("leaveError"), {
        duration: 5000,
      });
      return;
    }

    const res = await fetch(`/api/emails?email=${encodeURIComponent(email)}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success(t("leaveSuccess"));
    } else {
      const errorData = await res.json();
      toast.error(t("leaveError"), {
        duration: 5000,
      });
    }
    setIsOpen(false);
    setEmail("");
  };

  return (
    <>
      <button
        className={styles.notificationButton}
        onClick={() => setIsOpen(true)}
      >
        <div className={styles.notificationIcon}>
          <BellIcon />
          <span className={styles.notificationBadge}>1</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <h2 className={styles.modalTitle}>{t("title")}</h2>
            <p className={styles.modalDescription}>{t("description")}</p>

            <form onSubmit={handleSubmit}>
              <input
                className={styles.emailInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
              />
              <div className={styles.buttonContainer}>
                <button
                  className={styles.unsubscribeButton}
                  type="button"
                  onClick={handleUnsubscribe}
                >
                  {t("leave")}
                </button>
                <button className={styles.submitButton} type="submit">
                  {t("join")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
