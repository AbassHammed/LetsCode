/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { firestore } from '@/firebase/firebase';
import { useAuth, useSession } from '@/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from '@components';
import { userInfoQuery } from '@firebase/query';
import { zodResolver } from '@hookform/resolvers/zod';
import Icons from '@icons';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const joinSessionSchema = z.object({
  sessionId: z.string().min(16).max(16),
});

type JoinSessionValues = z.infer<typeof joinSessionSchema>;

export default function JoinSession() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('id');
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setuserData] = useState({ fullName: '', uid: '' });
  const { setSessionData, sessionData } = useSession();

  const fetchUser = useCallback(async () => {
    if (user) {
      const userInfo = await userInfoQuery(user.uid);
      if (userInfo) {
        setuserData({ fullName: userInfo.fullName, uid: user.uid });
      }
    }
  }, [user]);

  const joinSession = async (data: { sessionId: string }) => {
    try {
      setLoading(true);
      const sessionsQuery = query(
        collection(firestore, 'sessions'),
        where('sessionId', '==', data.sessionId),
      );
      const querySnapshot = await getDocs(sessionsQuery);

      if (querySnapshot.empty) {
        toast({
          variant: 'destructive',
          title: 'Session not found',
          description:
            'It seeems like the session you are trying to join does not exist or it has been deleted',
        });
        return;
      }

      const sessionDoc = querySnapshot.docs[0];
      const sessionLoad = sessionDoc.data();
      const usersRef = collection(firestore, `sessions/${sessionDoc.id}/users`);
      const userDocRef = doc(firestore, `sessions/${sessionDoc.id}/users/${userData.uid}`);
      const userInfoQuery = query(usersRef, where('name', '==', userData.fullName));
      const userSnapshot = await getDocs(userInfoQuery);

      if (userSnapshot.empty) {
        await setDoc(userDocRef, {
          name: userData.fullName,
          joinedAt: new Date(),
          connected: true,
          quittedAt: null,
        });
        setSessionData({
          ...sessionData,
          filePath: sessionLoad.filePath,
          sessionName: sessionLoad.sessionName,
          sessionDocId: sessionDoc.id,
          showPdfFile: sessionLoad.showPdfFile,
        });
        router.push(`/c/${data.sessionId}`);
      } else {
        const userDoc = userSnapshot.docs[0];
        if (!userDoc.data().connected) {
          toast({
            variant: 'destructive',
            title: 'Connection error',
            description:
              'You have been disconnected from this session by the admin, kindly demand acces from the admin',
          });
          return;
        }

        setSessionData({
          ...sessionData,
          filePath: sessionLoad.filePath,
          sessionName: sessionLoad.sessionName,
          sessionDocId: sessionDoc.id,
          showPdfFile: sessionLoad.showPdfFile,
        });

        router.push(`/c/${data.sessionId}`);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unknown Error',
        description: 'An error occured while joing the session, kindly retry later',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (data: { sessionId: string }) => {
    await fetchUser();
    await joinSession(data);
  };

  const defaultValues: Partial<JoinSessionValues> = {
    sessionId: '',
  };

  const form = useForm<JoinSessionValues>({
    resolver: zodResolver(joinSessionSchema),
    defaultValues,
  });

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  useEffect(() => {
    if (window.location.hash === '#joinsession' && sessionId) {
      form.setValue('sessionId', sessionId.toUpperCase());
      setOpen(true);
    }
  }, [form, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-64 h-40 bg-[#610C9F] rounded-lg shadow-md flex flex-col items-center text-white justify-center text-2xl font-bold cursor-pointer relative">
          <Icons.join className="mb-2 h-10 w-10 text-3xl" />
          Join a session
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow w-full sm:max-w-[450px] bg-gradient-to-b from-brand-purple to-slate-900 mx-auto">
        <div>
          <Form {...form}>
            <form
              className="space-y-4 px-6 py-4 text-[#f5f5f5]"
              onSubmit={form.handleSubmit(handleJoin)}>
              <DialogTitle>Join a session</DialogTitle>
              <FormField
                control={form.control}
                name="sessionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Session Id</FormLabel>
                    <FormControl>
                      <Input
                        id="sessionId"
                        type="text"
                        placeholder="AQF4BDS3WSQY5GD7"
                        autoComplete="sessionId"
                        {...field}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full px-4 text-white font-medium bg-brand-purple hover:bg-brand-purple-s rounded-lg duration-150">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Joining ...' : 'Join'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
