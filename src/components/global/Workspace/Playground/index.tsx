'use client';

import React, { useEffect, useState } from 'react';

import { languages } from '@config/lang';
import { useReadLocalStorage, useTernaryDarkMode } from '@hooks';
import { cn } from '@lib/utils';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';

import EditorFooter from './footer';
import PreferenceNav from './nav';

interface PlaygroundProps {
  className?: string;
  showPdfFile?: boolean;
}

const Playground = ({ className, showPdfFile }: PlaygroundProps) => {
  const { isDarkMode } = useTernaryDarkMode();
  const fontSize = useReadLocalStorage<string>('fontSize');
  const [selectedLanguage, setSelectedLanguage] = useState(
    sessionStorage.getItem('language') || 'C++',
  );
  const [currentCode, setCurrentCode] = useState(
    sessionStorage.getItem('code') ||
      languages[selectedLanguage as keyof typeof languages].initialCode,
  );
  const basicOptions = useReadLocalStorage<BasicSetupOptions>('editorOptions');

  useEffect(() => {
    sessionStorage.setItem('language', selectedLanguage);
    sessionStorage.setItem('code', currentCode);
  }, [selectedLanguage, currentCode]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentCode(languages[language as keyof typeof languages].initialCode);
  };

  const handleGenerate = () => {
    const fileExtension = languages[selectedLanguage as keyof typeof languages].fileExtension;
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `main${fileExtension}`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div
        onClick={e => e.preventDefault()}
        tabIndex={-1}
        className={cn(
          `rounded-md overflow-hidden ml-1 mr-2 my-1 focus:ring-1 focus-within:ring-[#969696] focus:ring-opacity-50
                       active:ring-1 active:ring-[#969696] active:ring-opacity-50`,
          className,
        )}>
        <PreferenceNav onLanguageSelect={handleLanguageSelect} />
        <div className="w-full overflow-auto dark:bg-[#262626] bg-white select-none h-[calc(100vh-140px)]">
          <CodeMirror
            basicSetup={basicOptions ? basicOptions : true}
            value={currentCode}
            onChange={setCurrentCode}
            theme={isDarkMode ? 'dark' : 'light'}
            extensions={[languages[selectedLanguage as keyof typeof languages].extension]}
            style={{ fontSize: fontSize || '13px' }}
          />
        </div>
      </div>
      <div
        tabIndex={-1}
        className={`focus:ring-1 focus:ring-[#969696] focus:ring-opacity-50
                       active:ring-1 active:ring-[#969696] active:ring-opacity-50 rounded-lg ml-1 ${!showPdfFile ? 'mr-1' : 'mr-2'} mt-2 mb-1`}>
        <EditorFooter handleGenerate={handleGenerate} />
      </div>
    </div>
  );
};

export default Playground;
