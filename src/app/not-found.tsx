/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Loading, toast } from '@components';

export default function NotFound() {
  const { push } = useRouter();
  useEffect(() => {
    toast({
      variant: 'destructive',
      title: 'Page not found',
      description: 'The page you are trying to access does not exist',
    });
    push('/session');
  }, []);

  return <Loading />;
}
