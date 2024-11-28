import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  aboutSub: boolean;
  setAbout1: () => void;
  setAbout2: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Créer un provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [aboutSub, setAboutSub] = useState(true);

  const setAbout1 = () => {
    setAboutSub(true);
  };
  const setAbout2 = () => {
    setAboutSub(false);
  };

  return (
    <AppContext.Provider value={{ aboutSub, setAbout1, setAbout2 }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personnalisé pour utiliser le context
export function useAppContext() {
  return useContext(AppContext);
}
