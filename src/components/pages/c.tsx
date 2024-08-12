'use client';

import React from 'react';

import Head from 'next/head';

// import { firestore } from '@/firebase/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
// import { useRouter } from 'next/router';

import { Loading, Topbar } from '@components';
import Workspace from '@components/global/Workspace';

// import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

const Compiler: React.FC = () => {
  const { sessionData } = useSession();
  const { user, loading: authLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   const handleDisconnect = async () => {
  //     if (
  //       user &&
  //       typeof sessionData?.sessionDocId === 'string' &&
  //       document.visibilityState === 'hidden'
  //     ) {
  //       const userRef = doc(firestore, `sessions/${sessionData.sessionDocId}/users`, user.uid);
  //       await updateDoc(userRef, {
  //         connected: false,
  //         quitedAt: serverTimestamp(),
  //       });
  //     }
  //   };

  //   if (!sessionData || !user) {
  //     return;
  //   }

  //   const unsubscribe = onSnapshot(
  //     doc(firestore, `sessions/${sessionData.sessionDocId}/users`, user.uid),
  //     docSnapshot => {
  //       if (!docSnapshot.exists() || !docSnapshot.data()?.connected) {
  //         router.push('/session');
  //       }
  //     },
  //   );

  //   // document.addEventListener('visibilitychange', handleDisconnect);

  //   return () => {
  //     // document.removeEventListener('visibilitychange', handleDisconnect);

  //     unsubscribe();
  //   };
  // }, [user, authLoading, sessionData, router]);

  if (!user || authLoading || !sessionData) {
    return <Loading />;
  }

  return (
    <div className="!min-h-full">
      <Head>
        <title>{sessionData.sessionName}</title>
      </Head>
      <Topbar compilerPage={true} dashboardPage={false} />
      <Workspace />
    </div>
  );
};

export default Compiler;
