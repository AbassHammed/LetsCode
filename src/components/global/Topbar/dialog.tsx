'use client';

import { ReactNode, useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@components';

interface TopBarDialogProps {
  title: string;
  message: string;
  onClick: () => void;
  icon: ReactNode;
}

export default function TopBarDialog({ title, message, onClick, icon }: TopBarDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded cursor-pointer flex flex-row items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px] dark:hover:bg-[#404040] hover:bg-[#f5f5f5] focus:outline-none w-full">
          {icon}
          <div className="grow text-left">{title}</div>
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="sm:max-w-[425px] dark:bg-neutral-800 bg-white ring-1 ring-gray-400 ring-opacity-30">
        <div className="p-5 space-y-3">
          <h4 className="font-semibold text-xl">{title} </h4>
          <p className="font-light text-sm">{message}</p>
        </div>
        <DialogFooter className="flex items-center dark:bg-neutral-900 bg-[#f0f0f0] rounded-b-lg p-5 font-light">
          <button
            className="flex-1 bg-brand-purple mx-2 p-2 rounded-md hover:bg-brand-purple/80"
            type="submit"
            onClick={onClick}>
            Continue
          </button>
          <button
            className="flex-1 bg-neutral-700 mx-2 p-2 rounded-md"
            onClick={() => setOpen(false)}>
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
