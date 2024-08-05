'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Loading } from '@components';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <Loading />;
}
