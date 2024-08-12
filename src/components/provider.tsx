'use client';

import React, { createContext, useEffect, useState } from 'react';

import { Toaster } from '@components';
import { useMediaQuery } from '@hooks';
import { decryptData, encryptData } from '@lib/crypto';
import { SessionData } from '@types';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import MobileScreen from './mobile';

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
      return encryptedData ? JSON.parse(decryptData(encryptedData)) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionData) {
        sessionStorage.setItem('sid', encryptData(JSON.stringify(sessionData)));
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

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const matches = useMediaQuery('(min-width: 768px)');
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
      <SessionProvider>
        <div className="bg-[#f0f0f0] dark:bg-[#0f0f0f]">
          {isClient && matches ? children : <MobileScreen />}
        </div>
      </SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default Provider;
