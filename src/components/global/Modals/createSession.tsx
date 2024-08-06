/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { firestore, storage } from '@/firebase/firebase';
import { useAuth } from '@/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
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
import { zodResolver } from '@hookform/resolvers/zod';
import Icons from '@icons';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

const MAX_FILE_SIZE = 10000000;
const FILE_TYPE = 'application/pdf';

const createSessionSchema = z.object({
  sessionName: z.string().min(7).max(25),
  sessionId: z.string().min(16).max(16),
});

type CreateSessionValues = z.infer<typeof createSessionSchema>;

export default function CreateSession() {
  const [open, setOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const [progress, setProgress] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const generateSessionId = () => Math.random().toString(36).slice(-16).toUpperCase();

  const handleGenerateSessionId = () => setSessionId(generateSessionId());

  const handleSelectedFile = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a PDF file',
      });
    }

    const file = files[0];

    if (file.size > MAX_FILE_SIZE || file.type !== FILE_TYPE) {
      return toast({
        variant: 'destructive',
        title: 'Invalid file',
        description: 'File must be a PDF and less than 10MB',
      });
    }

    setPdfFile(file);
  };

  const handleUploadFile = async () => {
    if (!pdfFile) {
      toast({
        variant: 'destructive',
        title: 'Upload error',
        description: 'Seems like your file cannot be uploaded, remove it and upload again',
      });
      return;
    }

    const uid = uuid();
    const storageRef = ref(storage, `pdfFiles/${uid}-${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    try {
      const snapshot = await uploadTask;
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      return await getDownloadURL(snapshot.ref);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'File upload error',
        description: 'An error occurred while uploading the PDF file',
      });
      throw error.message;
    }
  };

  const handleCreate = async (data: { sessionName: string; sessionId: string }) => {
    setLoading(true);
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Session creation Error',
        description: 'You are not logged in, kindly do so and come back.',
      });
      return;
    }

    try {
      const filePath = await handleUploadFile();
      await addDoc(collection(firestore, 'sessions'), {
        userId: user.uid,
        sessionName: data.sessionName,
        sessionId: data.sessionId,
        filePath,
        createdAt: serverTimestamp(),
      });
      router.push(`/d/${data.sessionId}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Session creation Error',
        description: 'An error occured while creating the session',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<CreateSessionValues> = {
    sessionName: '',
    sessionId: '',
  };

  const form = useForm<CreateSessionValues>({
    resolver: zodResolver(createSessionSchema),
    defaultValues,
  });

  const handleRemoveFile = () => setPdfFile(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-64 h-40 bg-[#03C988] rounded-lg shadow-md flex flex-col items-center justify-center text-2xl font-bold cursor-pointer relative">
          <Icons.create className="mb-2 h-10 w-10 text-3xl" />
          Create a session
        </button>
      </DialogTrigger>
      <DialogContent>
        <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-purple to-slate-900 mx-6">
          <Form {...form}>
            <form
              className="space-y-8 px-6 py-4 text-[#f5f5f5]"
              onSubmit={form.handleSubmit(handleCreate)}>
              <DialogTitle>Create session</DialogTitle>
              <FormField
                control={form.control}
                name="sessionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Give your session a name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@john.doe"
                        autoComplete="username"
                        {...field}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sessionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Session Id</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <button
                          type="button"
                          className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                          onClick={() => handleGenerateSessionId()}>
                          <Icons.eyesplash />
                        </button>
                        <Input
                          type="text"
                          autoComplete="sessionId"
                          {...field}
                          value={sessionId}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full px-4 text-white font-medium bg-brand-purple hover:bg-brand-purple-s rounded-lg duration-150">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
