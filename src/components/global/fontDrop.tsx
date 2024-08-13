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
        <div className="flex whitespace-nowrap bg-gray-100 dark:bg-[#474747] h-6 !flex-row justify-center items-center m-1 rounded p-1 cursor-pointer text-sm font-extralight">
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
              className="relative flex w-24 p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
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
