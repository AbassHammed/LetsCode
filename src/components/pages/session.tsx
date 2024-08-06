'use client';

import Image from 'next/image';

import { CreateSession, JoinSession, Loading } from '@components';
import { useAuth } from '@hooks';

import IconImage from '../../../public/Icon.png';

export default function Session() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute w-full top-0">
        <div className="flex items-center justify-center h-[5rem] relative">
          <div className="absolute top-4 left-4 flex items-center">
            <Image
              priority
              quality={95}
              height={50}
              width={50}
              alt="LetsCode Logo"
              src={IconImage}
              style={{
                height: 'auto',
                width: 'auto',
              }}
            />
            <h1 className="fonth1 ml-2">LetsCode</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <JoinSession />
        <CreateSession />
      </div>
    </div>
  );
}
