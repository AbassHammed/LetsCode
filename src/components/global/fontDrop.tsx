'use client';

import React from 'react';

import { useLocalStorage } from '@/hooks';
import { Icons, Popover, PopoverContent, PopoverTrigger } from '@components';
import { fonts } from '@config/constants';

const FontDrop = () => {
  const [value, setValue] = useLocalStorage('fontSize', '13px');

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap !flex-row justify-center items-center m-1 rounded-md p-1 cursor-pointer hover:bg-gray-8  text-[#a8a8a8] text-sm font-normal">
          {value}
          <Icons.chevronDown className="h-5 w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-28 flex flex-row p-1 m-1 dark:bg-[#323232] ring-1 ring-[#969696] ring-opacity-50"
        align="start">
        <div className="flex flex-col">
          {fonts.map(font => (
            <div
              onClick={() => setValue(font.name)}
              key={font.id}
              className="relative flex w-24 p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  value === font.name ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px]">{font.name}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontDrop;
