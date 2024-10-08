import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger, Icons } from '@components';
import { SettingsNav } from '@types';

import EditorSettings from './editor';
import SettingNav from './settings-nav';
import ShortCut from './shortcut';

export default function Settings() {
  const [variant, setVariant] = useState<SettingsNav>('editor');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center p-2 font-medium group focus:outline-none rounded hover:dark:bg-[#ffffff14] hover:bg-[#e7e7e7]">
          <Icons.settings className="h-[18px] w-[18px] dark:text-[#fff9] text-[#585c65] group-hover:text-black dark:group-hover:text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-[460px] bg-white gap-0 dark:bg-[#373737] p-0 rounded-lg border-0 ring-1 ring-[#969696] ring-opacity-35 sm:max-w-[780px]">
        <SettingNav setVariant={setVariant} variant={variant} />
        <div className="flex-1 overflow-auto">
          {variant === 'editor' ? <EditorSettings /> : <ShortCut />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
