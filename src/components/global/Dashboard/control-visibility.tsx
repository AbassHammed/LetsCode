/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@components/shared/button';
import Icons from '@components/shared/icons';
import { useAuth } from '@hooks';
import { Session } from '@types';

export default function ControlSessionVisibility({ session }: { session: Session }) {
  const { user } = useAuth();

  return (
    <Button
      variant={session.showWhenJoined ? 'destructive' : 'primary'}
      size="sm"
      className="ml-auto hidden h-8 md:flex">
      {session.showWhenJoined ? (
        <Icons.lock className="mr-2 h-4 w-4" />
      ) : (
        <Icons.lockOpen className="mr-2 h-4 w-4" />
      )}
      {session.showWhenJoined ? 'Block Access' : 'Allow access'}
    </Button>
  );
}
