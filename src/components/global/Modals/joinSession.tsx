/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { firestore, storage } from '@/firebase/firebase';
import { useAuth } from '@/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const joinSessionSchema = z.object({
  sessionId: z.string().min(16).max(16),
});

type JoinSessionValues = z.infer<typeof joinSessionSchema>;

export default function JoinSession() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setuserData] = useState({ fullName: '', uid: '' });

  const fetchUser = async () => {
    if (user) {
      const userInfo = await userInfoQuery(user.uid);
      if (userInfo) {
        setuserData({ fullName: userInfo.fullName, uid: user.uid });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<JoinSessionValues> = {
    sessionId: '',
  };

  const form = useForm<JoinSessionValues>({
    resolver: zodResolver(joinSessionSchema),
    defaultValues,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-64 h-40 bg-[#610C9F] rounded-lg shadow-md flex flex-col items-center justify-center text-2xl font-bold cursor-pointer relative">
          <Icons.join className="mb-2 h-10 w-10 text-3xl" />
          Join a session
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow w-full sm:max-w-[450px] bg-gradient-to-b from-brand-purple to-slate-900 mx-auto">
        <div>
          <Form {...form}>
            <form
              className="space-y-4 px-6 py-4 text-[#f5f5f5]"
              onSubmit={form.handleSubmit(handleCreate)}>
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
