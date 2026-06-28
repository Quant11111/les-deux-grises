"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminHorses from "./AdminHorses";
import AdminEmails from "./AdminEmails";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState<"horses" | "emails">("horses");

  // Restore the session on load (the cookie is httpOnly, so we ask the server).
  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => setAuthenticated(Boolean(d?.authenticated)))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setPassword("");
      } else {
        toast.error("Mot de passe incorrect");
      }
    } catch {
      toast.error("Erreur lors de la connexion");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.muted}>Chargement…</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.loginWrap}>
          <form onSubmit={handleLogin} className={styles.loginCard}>
            <h1>Administration</h1>
            <div className={styles.field}>
              <label className={styles.label}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Mot de passe administrateur"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={loggingIn}
            >
              {loggingIn ? "Vérification…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1 className={styles.title}>Administration</h1>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === "horses" ? styles.tabActive : ""}`}
            onClick={() => setTab("horses")}
          >
            Chevaux
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "emails" ? styles.tabActive : ""}`}
            onClick={() => setTab("emails")}
          >
            Emails
          </button>
        </div>

        {tab === "horses" ? <AdminHorses /> : <AdminEmails />}
      </div>
    </div>
  );
}
