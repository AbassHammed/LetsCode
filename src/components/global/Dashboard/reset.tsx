/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export default function ResetSession() {
  const { user } = useAuth();

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
            'It seeems like the session you are trying to reset does not exist, verify you are connected to internet and then reload your page please.',
        });
        return;
      }

      const sessionDoc = querySnapshot.docs[0];
      const sessionDocRef = doc(firestore, 'sessions', sessionDoc.id);
      const usersSubcollectionRef = collection(sessionDocRef, 'users');
      const usersSnapshot = await getDocs(usersSubcollectionRef);
      const usersDeletions = usersSnapshot.docs.map(userDoc => deleteDoc(userDoc.ref));
      await Promise.all(usersDeletions);

      toast({
        variant: 'default',
        title: 'Session closed',
        description: 'Session has been successfully reset.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Session closing error',
        description: 'There was an error while resetting the session, kindly try again.',
      });
    }
  };
}
