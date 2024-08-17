/* eslint-disable no-console */
'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { Loading, Topbar } from '@components';
import Workspace from '@components/global/Workspace';
import { firestore } from '@firebase/firebase';
import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

const Compiler: React.FC = () => {
  const { sessionData } = useSession();
  const { user, loading: authLoading } = useAuth();
  const [showScreen, setShowScreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter();

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

    const handleMouseLeave = () => setShowOverlay(true);
    const handleMouseEnter = () => setShowOverlay(false);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      unsubscribe();
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [user, sessionData]);

  useEffect(() => {
    const handleDisconnect = async () => {
      if (
        user &&
        typeof sessionData?.sessionDocId === 'string' &&
        document.visibilityState === 'hidden'
      ) {
        const userRef = doc(firestore, `sessions/${sessionData.sessionDocId}/users`, user.uid);
        await updateDoc(userRef, {
          connected: false,
          quittedAt: serverTimestamp(),
        });
      }
    };

    // const handlePageShow = (event: PageTransitionEvent) => {
    //   localStorage.setItem('lol', 'abasshammed');
    //   if (event.persisted) {
    //     handleDisconnect();
    //   }
    // };

    if (!sessionData || !user) {
      return;
    }

    const unsubscribe = onSnapshot(
      doc(firestore, `sessions/${sessionData.sessionDocId}/users`, user.uid),
      docSnapshot => {
        if (!docSnapshot.exists() || !docSnapshot.data()?.connected) {
          // sessionStorage.removeItem('sid');
          // sessionStorage.removeItem('code');
          // sessionStorage.removeItem('language');
          router.push('/session');
        }
      },
    );

    document.addEventListener('visibilitychange', handleDisconnect);
    window.addEventListener('pagehide', handleDisconnect);

    return () => {
      document.removeEventListener('visibilitychange', handleDisconnect);
      window.removeEventListener('pagehide', handleDisconnect);
      unsubscribe();
    };
  }, [user, authLoading, sessionData, router]);

  useEffect(() => {
    history.pushState(null, '', location.href);
  }, []);

  if (!user || authLoading || !sessionData) {
    return <Loading />;
  }

  const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  console.log('reason', entries.type);

  return showScreen ? (
    <div className="!min-h-full w-full">
      <div
        className={`fixed inset-0 h-full w-full bg-black bg-opacity-80 z-50 ${showOverlay ? 'visible' : 'invisible'} `}
        onClick={() => setShowOverlay(false)}>
        <div className="flex h-full items-center justify-center">
          <span className="text-white fonth1 font-medium text-2xl">
            Leaving this page will automatically disconnect you from the session
          </span>
        </div>
      </div>
      <Topbar compilerPage={true} dashboardPage={false} />
      <Workspace />
    </div>
  ) : (
    <Loading />
  );
};

export default Compiler;
