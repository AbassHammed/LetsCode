'use client';

// import { promises as fs } from 'fs';
// import path from 'path';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@components/shared/loading';
import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';

// import { z } from 'zod';

import { columns } from './columns';
import { UserType } from './data/schema';
import { DataTable } from './table';

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), 'src/components/global/Dashboard/data/users.json'),
//     'utf8',
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(userSchema).parse(tasks);
// }

export default function TaskPage() {
  // const tasks = await getTasks();
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
            name: basicUserData.name,
            connected: basicUserData.connected ? 'connected' : 'disconnected',
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
      </div>
      <div className="overflow-auto">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  );
}
