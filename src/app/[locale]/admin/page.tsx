"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast, Toaster } from "sonner";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchEmails();
      } else {
        toast.error("Mot de passe incorrect");
      }
    } catch (error) {
      toast.error("Erreur lors de la vérification du mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/emails");
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      } else {
        toast.error("Erreur lors de la récupération des emails");
      }
    } catch (error) {
      toast.error("Erreur lors de la récupération des emails");
    } finally {
      setIsLoading(false);
    }
  };

  const copyAllEmails = () => {
    const emailsText = emails.join("\n");
    navigator.clipboard
      .writeText(emailsText)
      .then(() =>
        toast.success("Tous les emails ont été copiés dans le presse-papier")
      )
      .catch(() => toast.error("Erreur lors de la copie des emails"));
  };

  return (
    <div className="admin-container">
      <h1>Administration</h1>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe administrateur"
            className="password-input"
            required
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Vérification..." : "Se connecter"}
          </button>
        </form>
      ) : (
        <div className="emails-container">
          <div className="emails-header">
            <h2>Liste des emails ({emails.length})</h2>
            <button onClick={copyAllEmails} className="copy-button">
              Copier tous les emails
            </button>
          </div>

          {isLoading ? (
            <p>Chargement des emails...</p>
          ) : (
            <ul className="emails-list">
              {emails.map((email, index) => (
                <li key={index} className="email-item">
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Toaster />

      <style jsx>{`
        .admin-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
          max-width: 400px;
        }

        .password-input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .login-button {
          padding: 0.5rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .emails-container {
          margin-top: 2rem;
        }

        .emails-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .copy-button {
          padding: 0.5rem 1rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .emails-list {
          list-style: none;
          padding: 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          max-height: 400px;
          overflow-y: auto;
        }

        .email-item {
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #eee;
        }

        .email-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}
