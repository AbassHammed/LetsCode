'use client';

import React, { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@components';
import Icons from '@components/shared/icons';

interface LanguageOption {
  id: string;
  name: string;
}

const languages1: LanguageOption[] = [
  { id: '1', name: 'C++' },
  { id: '2', name: 'Python' },
  { id: '4', name: 'C' },
  { id: '3', name: 'JavaScript' },
  { id: '5', name: 'Java' },
  { id: '6', name: 'Ruby' },
] as const;

const languages2: LanguageOption[] = [
  { id: '7', name: 'Go' },
  { id: '8', name: 'Rust' },
  { id: '9', name: 'TypeScript' },
  { id: '10', name: 'PHP' },
  { id: '11', name: 'Swift' },
  { id: '12', name: 'Kotlin' },
] as const;

const languages3: LanguageOption[] = [
  { id: '13', name: 'C#' },
  { id: '14', name: 'Perl' },
  { id: '15', name: 'Haskell' },
  { id: '16', name: 'Lua' },
  { id: '17', name: 'R' },
] as const;

const languages = [...languages1, ...languages2, ...languages3];

interface DropDownProps {
  onLanguageSelect: (language: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ onLanguageSelect }) => {
  const language = sessionStorage.getItem('language');
  const [selectedLanguage, setSelectedLanguage] = useState(language || languages[0].name);

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language.name);
    onLanguageSelect(language.name);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap !flex-row justify-center items-center m-1 rounded-md p-1 cursor-pointer dark:hover:bg-gray-8 hover:bg-[#e7e7e7] text-[#a8a8a8] text-sm font-normal">
          {selectedLanguage}
          {/* <ChevronDownIcon className="h-5 w-5" /> */}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] flex flex-row p-1 m-1 dark:bg-[#323232]" align="start">
        <div className="flex flex-col">
          {languages1.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
        <span className="h-56 w-[0.5px] bg-gray-500 py-6" />
        <div className="flex flex-col">
          {languages2.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
        <span className="h-56 w-[0.5px] bg-gray-500 py-6" />
        <div className="flex flex-col">
          {languages3.map(language => (
            <div
              onClick={() => handleLanguageChange(language)}
              key={language.id}
              className="relative flex w-[120px] p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  selectedLanguage === language.name ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px]">{language.name}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;
