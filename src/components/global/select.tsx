'use client';

import React from 'react';

import { useEditorOptions, useLocalStorage } from '@/hooks';
import { Icons, Popover, PopoverContent, PopoverTrigger } from '@components';
import { tabSizes } from '@config/constants';

const KeyBind = () => {
  const [value, setValue] = useLocalStorage('keybind', 'vscode');

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap bg-gray-100 dark:bg-[#474747] h-6 !flex-row justify-center items-center m-1 rounded-md p-1 cursor-pointer text-sm font-extralight">
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
            className="relative flex w-24 p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
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
  const { options, updateOption } = useEditorOptions();
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex whitespace-nowrap !flex-row h-6 justify-center bg-gray-100 dark:bg-[#474747] items-center m-1 rounded-md p-1 cursor-pointer text-sm font-extralight">
          {`${options.tabSize} spaces`}
          <Icons.chevronDown className="h-5 w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-28 flex flex-row p-1 m-1 dark:bg-[#323232] ring-1 ring-[#969696] ring-opacity-50"
        align="start">
        <div className="flex flex-col">
          {tabSizes.map(size => (
            <div
              onClick={() => updateOption('tabSize', size.key)}
              key={`${size.key}`}
              className="relative flex w-24 p-1 m-1 rounded-[4px] dark:text-[#f5f5f5] dark:hover:bg-[#4d4d4d] hover:bg-[#f5f5f5] focus:outline-none cursor-pointer">
              <span
                className={`flex items-center mr-2 ${
                  options.tabSize === size.key ? 'visible' : 'invisible'
                }`}>
                <Icons.check />
              </span>
              <div className="text-left text-[14px] text-nowrap">{size.value}</div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { KeyBind, TabSize };
