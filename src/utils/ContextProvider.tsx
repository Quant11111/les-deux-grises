// app/providers.tsx
"use client";

import { AppProvider } from "./context";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppProvider>{children}</AppProvider>;
}
