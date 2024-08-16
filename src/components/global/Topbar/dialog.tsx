'use client';

import { ReactNode, useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@components';

interface TopBarDialogProps {
  title: string;
  message: string;
  onClick: () => void;
  label: string;
  icon: ReactNode;
}

export default function TopBarDialog({ title, message, onClick, label, icon }: TopBarDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="rounded cursor-pointer flex flex-row items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px] dark:hover:bg-[#404040] hover:bg-[#f5f5f5] focus:outline-none"
          onClick={onClick}>
          {icon}
          <div className="grow text-left">{label}</div>
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="sm:max-w-[425px] bg-neutral-800 ring-1 ring-gray-400 ring-opacity-50">
        <div className="p-5 space-y-3">
          <h4 className="font-semibold text-xl">{`${title} ?`} </h4>
          <p className="font-extralight text-sm">{message}</p>
        </div>
        <DialogFooter className="flex items-center bg-neutral-900 rounded-b-lg p-5 font-light">
          <button
            className="flex-1 bg-blue-800 mx-2 p-2 rounded-md"
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
