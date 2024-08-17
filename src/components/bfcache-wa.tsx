/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

import { useAuth, useSession } from '@hooks';

export default function Overlay() {
  const { user } = useAuth();
  const { sessionData } = useSession();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if
  // }, []);

  return (
    show && (
      <div className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 z-50  `}>
        <div className="flex h-full items-center justify-center">
          <span className="text-white fonth1 font-medium text-2xl">
            Leaving this page will automatically disconnect you from the session
          </span>
        </div>
      </div>
    )
  );
}
