'use client';

import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Icons,
} from '@components';
import { Themes } from '@config/constants';
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

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded cursor-pointer flex flex-row items-center justify-between w-full py-3 space-x-6 px-2 md:space-x-3 md:py-[10px] dark:hover:bg-[#404040] hover:bg-[#f5f5f5]">
          <div className="leading-none">
            {selectedKey === 'dark' ? (
              <Icons.moon />
            ) : selectedKey === 'light' ? (
              <Icons.sun />
            ) : (
              <Icons.sunmoon />
            )}
          </div>
          <div className="grow text-left"> Apparence</div>
          <Icons.chevronRight className="w-[14px] h-[14px]" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="w-48 dark:bg-[#303030] border-none" side="left">
            <div className="flex flex-col p-2">
              {Themes.map((theme, idx) => (
                <div
                  onClick={() => handleThemeChange(theme.value as 'dark' | 'light' | 'system')}
                  key={idx}
                  className="relative flex w-full p-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#404040] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
                  <span
                    className={`flex items-center mr-2 ${
                      selectedKey === theme.value ? 'visible' : 'invisible'
                    }`}>
                    <Icons.check />
                  </span>
                  <div className="text-left text-[14px]">{theme.name}</div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
