import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger, Icons, ToolTip } from '@components';
import { SettingsNav } from '@types';

import SettingNav from './settings-nav';

export default function Settings() {
  const [variant, setVariant] = useState<SettingsNav>('editor');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToolTip side="bottom" aschild message="Settings">
          <button className="inline-flex items-center justify-center p-2 font-medium group focus:outline-none hover:dark:bg-[#ffffff14] hover:bg-[#e7e7e7]">
            <Icons.settings className="dark:text-[#fff9] text-[#585c65] group-hover:text-black dark:group-hover:text-white" />
          </button>
        </ToolTip>
      </DialogTrigger>
      <DialogContent className="flex h-[460px] w-[600px] bg-background p-0 m-0 rounded-lg border-0 ring-1 ring-[#969696] ring-opacity-50">
        <SettingNav setVariant={setVariant} variant={variant} />
        <div className="flex-1 lg:max-2xl overflow-auto"></div>
      </DialogContent>
    </Dialog>
  );
}
