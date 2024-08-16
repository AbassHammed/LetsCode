'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Apparence,
  Icons,
  InitialsContainer,
  Loading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '@components';
import { auth, firestore, storage } from '@firebase/firebase';
import { userInfoQuery } from '@firebase/query';
import { useAuth, useSession } from '@hooks';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useSignOut } from 'react-firebase-hooks/auth';

import TopBarDialog from './dialog';

interface AvatarPopProps {
  compilerPage?: boolean;
  dashBoardPage?: boolean;
}

const AvatarPop: React.FC<AvatarPopProps> = ({ compilerPage = false, dashBoardPage = false }) => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
  } | null>(null);
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

      router.push('/session');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unknown Quitting Error',
        description: 'There was an error quitting the session',
      });
    }
  };

  const handleCloseSession = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: 'It looks like you are not logged in or connected to the internet.',
      });
      return;
    }

    try {
      const sessionQuery = query(
        collection(firestore, 'sessions'),
        where('userId', '==', user.uid),
      );
      const querySnapshot = await getDocs(sessionQuery);

      if (querySnapshot.empty) {
        toast({
          variant: 'destructive',
          title: 'Session not found',
          description:
            'It seeems like the session you are trying to close does not exist, verify you are connected to internet and then reload your page please.',
        });
        router.push('/session');
        return;
      }

      const sessionDoc = querySnapshot.docs[0];
      const sessionDocRef = doc(firestore, 'sessions', sessionDoc.id);
      const usersSubcollectionRef = collection(sessionDocRef, 'users');
      const usersSnapshot = await getDocs(usersSubcollectionRef);
      const usersDeletions = usersSnapshot.docs.map(userDoc => deleteDoc(userDoc.ref));
      await Promise.all(usersDeletions);
      await deleteDoc(sessionDocRef);
      if (sessionDoc.data().filePath) {
        const fileRef = ref(storage, sessionDoc.data().filePath);
        await deleteObject(fileRef);
      }

      toast({
        variant: 'default',
        title: 'Session closed',
        description: 'Session closed and file deleted successfully.',
      });
      router.push('/session');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Session closing error',
        description: 'There was an error while closing the session, kindly try again.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await userInfoQuery(user.uid);
        if (data) {
          setUserData({ fullName: data.fullName, email: user.email! });
        }
      }
    };

    fetchData();
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    userData && (
      <Popover>
        <PopoverTrigger className="flex cursor-pointer group relative !h-6 justify-center items-center">
          <InitialsContainer name={userData.fullName} className="outline-none" />
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={e => e.preventDefault()}
          className="relative w-[270px] flex top-3 flex-col right-3 p-2 text-[14px] dark:bg-[#303030] border-none ring-1 ring-gray-300 ring-opacity-50">
          <div className="flex shrink-0 items-center px-[1px]">
            <InitialsContainer name={userData.fullName} className="h-14 w-14 text-[18px]" />
            <div className="pl-3">
              <h4 className="flex items-center text-small font-semibold">{userData.fullName}</h4>
              <h5 className="text-small tracking-tight">{userData.email}</h5>
            </div>
            <div className="flex flex-row"></div>
          </div>
          <div className="p-0 mt-4 md:border-none focus:outline-none dark:text-[#ffffff99]">
            <Apparence />
            {compilerPage && (
              <TopBarDialog
                title="Quit session"
                message="Are you sure you want to quit this session ?"
                onClick={handleQuitSession}
                icon={<Icons.quit />}
              />
            )}
            {dashBoardPage && (
              <TopBarDialog
                title="Close Session"
                message="Closing this session will delete every data related to this session permanently"
                onClick={handleCloseSession}
                icon={<Icons.quit />}
              />
            )}
            <TopBarDialog
              title="Sign out"
              message="You will be signed out, are you sure you want to sign out ? "
              onClick={signOut}
              icon={<Icons.logout />}
            />
          </div>
        </PopoverContent>
      </Popover>
    )
  );
};

export default AvatarPop;
