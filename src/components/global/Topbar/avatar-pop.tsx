/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { connected } from 'process';
import { ReactNode, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useToast } from '@components';
import { auth, firestore } from '@firebase/firebase';
import { useAuth, useSession } from '@hooks';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSignOut } from 'react-firebase-hooks/auth';

interface ModuleProps {
  onClick: () => void;
  label: string;
  icon: ReactNode;
}

const Module: React.FC<ModuleProps> = ({ onClick, label, icon }) => (
  <div
    className="rounded cursor-pointer flex flex-row items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px] dark:hover:bg-[#404040] hover:bg-[#f5f5f5] focus:outline-none"
    onClick={onClick}>
    <div className="leading-none">{icon}</div>
    <div className="grow text-left">{label}</div>
  </div>
);

interface AvatarPopProps {
  compilerPage?: boolean;
  dashBoardPage?: boolean;
}

const AvatarPop: React.FC<AvatarPopProps> = ({ compilerPage = false, dashBoardPage = false }) => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState({ fullName: '', uid: '' });
  const { toast } = useToast();
  const { sessionData } = useSession();
  const router = useRouter();
  const [signOut] = useSignOut(auth);

  const handleQuitSession = async () => {
    if (!sessionData || !user) {
      toast({
        variant: 'destructive',
        title: 'Unknown error',
        description:
          'There seems to be an unknown error, kindly reload the page and try again please.',
      });
      return;
    }

    try {
      const userDocRef = doc(firestore, `sessions/${sessionData.sessionDocId}/users`, user.uid);
      await updateDoc(userDocRef, {
        connected: false,
        quittedAt: serverTimestamp(),
      });

      router.push('/auth/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unknown Quitting Error',
        description: 'There was an error quitting the session',
      });
    }
  };
  return <div></div>;
};
