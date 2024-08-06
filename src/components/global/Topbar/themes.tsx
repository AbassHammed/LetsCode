/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import { useTernaryDarkMode } from '@hooks';
import { useTheme } from 'next-themes';

export default function Apparence() {
  const { setTernaryDarkMode, ternaryDarkMode } = useTernaryDarkMode();
  const { setTheme } = useTheme();
  const [selectedKey, setSelectedKey] = useState(ternaryDarkMode);

  const handleThemeChange = (theme: 'system' | 'dark' | 'light') => {
    setTheme(theme);
    setSelectedKey(theme);
    setTernaryDarkMode(theme);
  };

  return <div></div>;
}
