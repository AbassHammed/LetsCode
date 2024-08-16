/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  toast,
} from '@components';
import { firestore } from '@firebase/firebase';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { userSchema } from '@types';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = userSchema.parse(row.original);

  const handleBlock = async () => {
    try {
      const userDocRef = doc(firestore, `sessions/${user.sessionDocId}/users`, user.id);
      await updateDoc(userDocRef, {
        connected: false,
        quittedAt: serverTimestamp(),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'unknown Error',
        description:
          'The user can not be blocked from the session at the moment, please try again later',
      });
    }
  };

  const handleAllow = async () => {
    try {
      const userDocRef = doc(firestore, `sessions/${user.sessionDocId}/users`, user.id);
      await updateDoc(userDocRef, {
        connected: true,
        quittedAt: null,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'unknown Error',
        description:
          'The user can not be allowed into the session at the moment, please try again later',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleAllow}>Allow</DropdownMenuItem>
        <DropdownMenuItem onClick={handleBlock}>Block</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
