/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Loading, toast } from '@components';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const { push } = useRouter();
  useEffect(() => {
    toast({
      variant: 'destructive',
      title: error.name,
      description: error.message,
    });
    push('/session');
  }, []);

  return <Loading />;
}
