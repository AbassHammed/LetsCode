'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@components';

export default function ArchiveDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center h-9 p-2 rounded-md bg-neutral-700 font-extralight text-white text-sm">
          Archive all chats
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="sm:max-w-[425px] bg-neutral-800 ring-1 ring-gray-400 ring-opacity-50">
        <div className="p-5">Are you sure you want to archive all your chats ? </div>
        <DialogFooter className="flex items-center bg-neutral-900 rounded-b-lg p-5 font-light">
          <button className="flex-1 bg-blue-800 mx-2 p-2 rounded-md" type="submit">
            Yes
          </button>
          <button
            className="flex-1 bg-neutral-700 mx-2 p-2 rounded-md"
            onClick={() => setOpen(false)}>
            No
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
