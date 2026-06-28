"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "./admin.module.css";

export default function AdminEmails() {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/emails");
      if (res.ok) {
        setEmails(await res.json());
      } else {
        toast.error("Erreur lors de la récupération des emails");
      }
    } catch {
      toast.error("Erreur lors de la récupération des emails");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const copyAll = () => {
    navigator.clipboard
      .writeText(emails.join("\n"))
      .then(() => toast.success("Tous les emails ont été copiés"))
      .catch(() => toast.error("Erreur lors de la copie des emails"));
  };

  return (
    <div>
      <div className={styles.emailsHeader}>
        <h2 className={styles.sectionTitle}>
          Emails ({emails.length})
        </h2>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={copyAll}
          disabled={emails.length === 0}
        >
          Copier tous les emails
        </button>
      </div>

      {loading ? (
        <p className={styles.muted}>Chargement des emails…</p>
      ) : emails.length === 0 ? (
        <p className={styles.muted}>Aucun email pour le moment.</p>
      ) : (
        <ul className={styles.emailsList}>
          {emails.map((email, index) => (
            <li key={index} className={styles.emailItem}>
              {email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
