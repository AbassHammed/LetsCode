'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Icons, Input, Label } from '@components';
import Loading from '@components/shared/loading';
import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth, useCopyToClipboard } from '@hooks';
import { Session } from '@types';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import QRCode from 'react-qr-code';

import { columns } from './columns';
import { UserType } from './data/schema';
import { DataTable } from './table';

export default function TaskPage() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [copying, setCopy] = useState(false);
  const router = useRouter();
  const [, copy] = useCopyToClipboard();

  async function handleCopy(text: string) {
    setCopy(true);
    await copy(text);
    setTimeout(() => setCopy(false), 5000);
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const sessionQuery = query(collection(firestore, 'sessions'), where('userId', '==', user.uid));
    const unsubscribeSession = onSnapshot(sessionQuery, querySnapshot => {
      if (querySnapshot.empty) {
        toast({
          variant: 'destructive',
          title: 'No session',
          description: 'It seems like you do not have any open sessions',
        });
        router.push('/session');
        return;
      }

      const sessionDoc = querySnapshot.docs[0];
      setSession(sessionDoc.data() as Session);
      const usersRef = collection(firestore, 'sessions', sessionDoc.id, 'users');
      onSnapshot(usersRef, async snapshot => {
        const usersDataPromises = snapshot.docs.map(async doc => {
          const basicUserData: {
            name: string;
            connected: boolean;
            joinedAt: Timestamp;
            quittedAt: Timestamp;
          } = doc.data() as {
            name: string;
            connected: boolean;
            joinedAt: Timestamp;
            quittedAt: Timestamp;
          };

          return {
            id: doc.id,
            sessionDocId: sessionDoc.id,
            name: basicUserData.name,
            status: basicUserData.connected ? 'connected' : 'disconnected',
            joinedAt: basicUserData.joinedAt.toDate().toLocaleTimeString() as string,
            quittedAt: basicUserData.quittedAt
              ? (basicUserData.quittedAt.toDate().toLocaleTimeString() as string)
              : null,
          };
        });

        const combinedUsersData = (await Promise.all(usersDataPromises)).filter(
          user => user !== undefined,
        ) as UserType[];
        setUsers(combinedUsersData);
      });
    });

    return () => {
      if (unsubscribeSession) {
        unsubscribeSession();
      }
    };
  }, [user, router]);

  if (loading) {
    <Loading />;
  }

  const sessionLink = `https://letscode.vercel.app/session?id=${session?.sessionId}#joinsession`;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <div className="flex flex-col space-y-1.5 text-center sm:text-left my-3">
            <h1 className="text-lg font-semibold leading-none tracking-tight">Share link</h1>
            <p className="text-sm text-muted-foreground">
              Anyone who has this link will be able to view this.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={sessionLink} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              disabled={copying}
              onClick={() => handleCopy(sessionLink)}>
              <span className="sr-only">Copy</span>
              {copying ? <Icons.check className="h-4 w-4" /> : <Icons.copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white p-2 rounded">
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={sessionLink}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  );
}
