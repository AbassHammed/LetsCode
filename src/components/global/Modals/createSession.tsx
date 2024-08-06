/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { firestore, storage } from '@/firebase/firebase';
import { useAuth } from '@/hooks';
import { Dialog, DialogContent, DialogFooter, DialogTrigger, toast } from '@components';
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
  const [pdfFile, setPdfFile] = useState<File>();
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

  const handleCreate = async (data: { sessioName: string; sessionId: string }) => {
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
        sessionName: data.sessioName,
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-64 h-40 bg-[#03C988] rounded-lg shadow-md flex flex-col items-center justify-center text-2xl font-bold cursor-pointer relative">
          <Icons.create className="mb-2 h-10 w-10 text-3xl" />
          Create a session
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseIcon={false}
        className="sm:max-w-[425px] bg-neutral-800 ring-1 ring-gray-400 ring-opacity-50">
        <div className="p-5">Are you sure you want to archive all your chats ? </div>
        <DialogFooter className="flex items-center bg-neutral-900 rounded-b-lg p-5 font-light">
          <button className="flex-1 bg-blue-800 mx-2 p-2 rounded-md" type="submit">
            Yes
          </button>
          <button
            className="flex-1 bg-neutral-700 mx-2 p-2 rounded-md"
            onClick={() => setOpen(false)}>
            No
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
