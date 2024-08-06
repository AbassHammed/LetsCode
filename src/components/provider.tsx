'use client';

import React, { createContext, useEffect, useState } from 'react';

import { Toaster } from '@components';
import { decryptData, encryptData } from '@lib/crypto';
import { SessionData } from '@types';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

interface SessionProviderProps {
  children: React.ReactNode;
}

interface SessionContextProps {
  sessionData: SessionData | null;
  setSessionData: React.Dispatch<React.SetStateAction<SessionData | null>>;
}

export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(() => {
    // Check if window is defined which indicates we're running in the browser
    if (typeof window !== 'undefined') {
      const encryptedData = sessionStorage.getItem('sid');
      const decryptedData = encryptedData ? decryptData(encryptedData) : null;
      return decryptedData ? JSON.parse(decryptedData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionData) {
        const encryptedData = encryptData(JSON.stringify(sessionData));
        sessionStorage.setItem('sid', encryptedData);
      } else {
        sessionStorage.removeItem('sid');
      }
    }
  }, [sessionData]);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => (
  <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
    <SessionProvider>{children}</SessionProvider>
    <Toaster />
  </ThemeProvider>
);

export default Provider;
