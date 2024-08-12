/* eslint-disable func-call-spacing */
/* eslint-disable indent */
import React, { createContext, useContext, useEffect, useState } from 'react';

import { defaultOptions } from '@config/editor';
import { BasicSetupOptions } from '@uiw/react-codemirror';

const EditorOptionsContext = createContext<{
  options: BasicSetupOptions;
  updateOption: (key: keyof BasicSetupOptions, value: boolean) => void;
} | null>(null);

export const EditorOptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<BasicSetupOptions>(() => {
    const storedOptions = localStorage.getItem('editorOptions');
    return storedOptions ? JSON.parse(storedOptions) : defaultOptions;
  });

  useEffect(() => {
    localStorage.setItem('editorOptions', JSON.stringify(options));
  }, [options]);

  const updateOption = (key: keyof BasicSetupOptions, value: boolean) => {
    setOptions(prevOptions => ({ ...prevOptions, [key]: value }));
  };

  return (
    <EditorOptionsContext.Provider value={{ options, updateOption }}>
      {children}
    </EditorOptionsContext.Provider>
  );
};

export const useEditorOptions = () => {
  const context = useContext(EditorOptionsContext);
  if (!context) {
    throw new Error('useEditorOptions must be used within an EditorOptionsProvider');
  }
  return context;
};
