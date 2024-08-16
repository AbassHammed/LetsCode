'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@components';
import { Button } from '@components/shared/button';
import Icons from '@components/shared/icons';
import { toast } from '@components/shared/toast';
import { firestore } from '@firebase/firebase';
import { useAuth } from '@hooks';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export default function ResetSession() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleReset = async () => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden h-8 md:flex">
          <Icons.sync className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="sm:max-w-[425px] dark:bg-neutral-800 bg-white ring-1 ring-gray-400 ring-opacity-30">
        <div className="p-5 space-y-3">
          <h4 className="font-semibold text-xl">Reset session </h4>
          <p className="font-light text-sm">
            Resetting this session will delete every user already in this session and any data
            related to those users permanently, meanwhile the session data won&apos;t change
          </p>
        </div>
        <DialogFooter className="flex items-center dark:bg-neutral-900 bg-[#f0f0f0] rounded-b-lg p-5 font-light">
          <button
            className="flex-1 bg-brand-purple mx-2 p-2 rounded-md hover:bg-brand-purple/80"
            type="submit"
            onClick={() => {
              handleReset();
              setOpen(false);
            }}>
            Continue
          </button>
          <button
            className="flex-1 bg-neutral-700 mx-2 p-2 rounded-md"
            onClick={() => setOpen(false)}>
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
