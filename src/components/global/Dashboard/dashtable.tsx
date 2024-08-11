'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@components/shared/loading';
import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import QRCode from 'react-qr-code';

import { columns } from './columns';
import { UserType } from './data/schema';
import { DataTable } from './table';

export default function TaskPage() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();

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

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
        </div>
        <div className="flex items-center justify-center bg-white p-2 rounded">
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`${window.location.hostname}/session?id=123456789#joinsession`}
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
