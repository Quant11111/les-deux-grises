"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BellIcon, X } from "lucide-react";
import { IconButton } from "@mui/material";
import { toast, Toaster } from "sonner";
import themeVariables from "@/utils/themeVariables";
import styled from "styled-components";

// Styled Components
const NotificationButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  padding: 0.2rem;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const NotificationIcon = styled.div`
  position: relative;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0.6rem;
  right: 0.1rem;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  margin: 0 1rem;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  border-radius: 10%;
  top: 0;
  right: 0;
  color: black;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${themeVariables.grassGreen};
`;

const ModalDescription = styled.p`
  margin-bottom: 1.5rem;
  color: ${themeVariables.grassGreen};
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const UnsubscribeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${themeVariables.neutralEarth};
  color: white;
  border-radius: 0px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${themeVariables.grassGreen};
  color: white;
  border-radius: 0px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${themeVariables.corporateBlue};
  }
`;

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
      <NotificationButton onClick={() => setIsOpen(true)}>
        <NotificationIcon>
          <BellIcon />
          <NotificationBadge>1</NotificationBadge>
        </NotificationIcon>
      </NotificationButton>

      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <StyledIconButton onClick={() => setIsOpen(false)}>
              <X />
            </StyledIconButton>
            <ModalTitle>{t("title")}</ModalTitle>
            <ModalDescription>{t("description")}</ModalDescription>

            <form onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
              />
              <ButtonContainer>
                <UnsubscribeButton type="button" onClick={handleUnsubscribe}>
                  {t("leave")}
                </UnsubscribeButton>
                <SubmitButton type="submit">{t("join")}</SubmitButton>
              </ButtonContainer>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
      <Toaster />
    </>
  );
}
