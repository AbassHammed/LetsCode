/* eslint-disable quotes */
'use client';

import { Button } from '@components/shared/button';
import Icons from '@components/shared/icons';
import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { Session } from '@types';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default function ControlSessionVisibility({ session }: { session: Session | null }) {
  const { user } = useAuth();

  const controlAccess = async (value: boolean) => {
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
      const sessionDocRef = doc(firestore, 'sessions', sessionDoc.id);
      await updateDoc(sessionDocRef, {
        showWhenJoined: value,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unknown error',
        description: "An error occured while try to change the user's views",
      });
    }
  };

  return (
    <Button
      variant={session?.showWhenJoined ? 'destructive' : 'primary'}
      size="sm"
      className="ml-auto h-8 flex  self-start"
      onClick={() => controlAccess(!session?.showWhenJoined)}>
      {session?.showWhenJoined ? (
        <Icons.lock className="mr-2 h-4 w-4" />
      ) : (
        <Icons.lockOpen className="mr-2 h-4 w-4" />
      )}
      {session?.showWhenJoined ? 'Block Access' : 'Allow access'}
    </Button>
  );
}
