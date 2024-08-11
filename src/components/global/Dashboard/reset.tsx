'use client';

import { Button } from '@components/shared/button';
import Icons from '@components/shared/icons';
import { toast, ToastAction } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export default function ResetSession() {
  const { user } = useAuth();

  const handleResetSession = async () => {
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
        title: 'Session reset',
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

  const handleReset = async () => {
    toast({
      title: 'Close Session',
      description:
        'Resetting this session will delete every user already in this session and any related data permanently',
      action: (
        <ToastAction altText="Close" onClick={handleResetSession}>
          Reset session
        </ToastAction>
      ),
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 md:flex"
      onClick={() => handleReset()}>
      <Icons.sync className="mr-2 h-4 w-4" />
      Reset
    </Button>
  );
}
