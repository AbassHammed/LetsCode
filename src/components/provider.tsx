'use client';

import { Toaster } from '@components';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => (
  <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
    <div>{children}</div>
    <Toaster />
  </ThemeProvider>
);

export default Provider;
