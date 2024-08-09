'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Loading, toast } from '@components';
import { firestore } from '@firebase/firebase';
import { useAuth, useScroll } from '@hooks';
import { cn } from '@lib/utils';
import { collection, getDocs, query, where } from 'firebase/firestore';

import Settings from '../settings';
import AvatarPop from './avatar-pop';
import Timer from './timer';

interface TopbarProps {
  compilerPage?: boolean;
  dashboardPage?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ compilerPage, dashboardPage = false }) => {
  const { user, loading } = useAuth();
  const [sessionName, setSessionName] = useState<string | null>(null);
  const scrolled = useScroll(5);

  useEffect(() => {
    const handleSession = async () => {
      if (!user) {
        return;
      }

      try {
        const sessionQuery = query(
          collection(firestore, 'sessions'),
          where('userId', '==', user.uid),
        );
        const querySnapshot = await getDocs(sessionQuery);

        if (querySnapshot.empty) {
          return;
        }

        const sessionDoc = querySnapshot.docs[0];
        setSessionName(sessionDoc.data().sessionName);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Unknown Error',
          description:
            'There was an error while retrieving data from the database, reload the page and try again.',
        });
      }
    };

    handleSession();
  }, [user]);

  if (loading || !sessionName) {
    return <Loading />;
  }

  return (
    <nav
      className={cn(
        `sticky flex h-[48px] w-full shrink-0 bg-background items-center top-0 left-0 px-3`,
        {
          'border-b backdrop-blur-lg': scrolled,
        },
      )}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/Icon.png"
                alt="Logo"
                height={30}
                width={40}
                style={{ height: 'auto', width: 'auto' }}
                priority
                quality={95}
              />
            </Link>
            <div className="flex items-center justify-center">
              <div className="h-[16px] w-[1px] bg-gray-500" />
              <span className="font-medium text-[14px] mx-3 dark:text-[#f5f5f5]">
                {dashboardPage ? `Dashboard - ${sessionName}` : `${sessionName}`}
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex items-center gap-3 justify-end">
          {user && compilerPage && (
            <>
              <Timer />
              <Settings />
            </>
          )}
          {user && (
            <div className="flex flex-row justify-center items-center gap-2">
              <AvatarPop compilerPage={compilerPage} dashBoardPage={dashboardPage} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
