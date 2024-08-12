'use client';

import React from 'react';

import { useLocalStorage } from '@/hooks';
import { Icons, Popover, PopoverContent, PopoverTrigger } from '@components';
import { tabSizes } from '@config/constants';

const KeyBind = () => {
  const [value, setValue] = useLocalStorage('keybind', 'vscode');

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
          <div
            onClick={() => setValue('vscode')}
            className="relative flex w-24 p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d] focus:outline-none cursor-pointer">
            <span className={`flex items-center mr-2 `}>
              <Icons.check />
            </span>
            <div className="text-left text-[14px]">VsCode</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TabSize = () => {
  const [value, setValue] = useLocalStorage('tabSize', 2);

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
          {tabSizes.map(size => (
            <div
              onClick={() => setValue(size.key)}
              key={`${size.key}`}
              className="relative flex w-24 p-1 m-1 rounded-[4px] text-[#f5f5f5] hover:bg-[#4d4d4d] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  value === size.key ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px]">{size.value}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { KeyBind, TabSize };
