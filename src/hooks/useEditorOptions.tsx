/* eslint-disable func-call-spacing */
/* eslint-disable indent */
import React, { createContext, useContext, useEffect, useState } from 'react';

import { defaultOptions } from '@config/editor';
import { BasicSetupOptions } from '@uiw/react-codemirror';

import { useLocalStorage } from './useLocalStorage';

const EditorOptionsContext = createContext<{
  options: BasicSetupOptions;
  updateOption: (key: keyof BasicSetupOptions, value: any) => void;
} | null>(null);

export const EditorOptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useLocalStorage('editorOptions', defaultOptions);
  const [options, setOptions] = useState<BasicSetupOptions>(value);

  useEffect(() => {
    setValue(options);
  }, [options, setValue]);

  const updateOption = (key: keyof BasicSetupOptions, value: any) => {
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
