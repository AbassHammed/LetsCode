'use client';

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
// import { useRouter } from 'next/router';

import { Loading, Topbar } from '@components';
import Workspace from '@components/global/Workspace';
import { firestore } from '@firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

const Compiler: React.FC = () => {
  const { sessionData } = useSession();
  const { user, loading: authLoading } = useAuth();
  const [showScreen, setShowScreen] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    if (!user || !sessionData) {
      return;
    }

    const unsubscribe = onSnapshot(
      doc(firestore, 'sessions', sessionData.sessionDocId!),
      docSnapshot => {
        if (docSnapshot.exists()) {
          setShowScreen(docSnapshot.data().showWhenJoined);
        }
      },
    );

    return () => unsubscribe();
  }, [user, sessionData]);

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

  return showScreen ? (
    <div className="!min-h-full w-full">
      <Topbar compilerPage={true} dashboardPage={false} />
      <Workspace />
    </div>
  ) : (
    <Loading />
  );
};

export default Compiler;
