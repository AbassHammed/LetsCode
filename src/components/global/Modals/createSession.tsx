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
  Switch,
  toast,
} from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import Icons from '@icons';
import { Cross2Icon } from '@radix-ui/react-icons';
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
  showPdf: z.boolean(),
});

type CreateSessionValues = z.infer<typeof createSessionSchema>;

export default function CreateSession() {
  const [open, setOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFile, setShowFile] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const generateSessionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
      '',
    );
  };

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

  const handleCreate = async (data: {
    sessionName: string;
    sessionId: string;
    showPdf: boolean;
  }) => {
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
      let filePath = null;

      if (showFile) {
        filePath = await handleUploadFile();
      }
      await addDoc(collection(firestore, 'sessions'), {
        userId: user.uid,
        sessionName: data.sessionName,
        sessionId: data.sessionId,
        filePath,
        showPdfFile: data.showPdf,
        createdAt: serverTimestamp(),
      });
      router.push(`/dashboard`);
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
    showPdf: true,
  };

  const form = useForm<CreateSessionValues>({
    resolver: zodResolver(createSessionSchema),
    defaultValues,
  });

  const handleGenerateSessionId = () => form.setValue('sessionId', generateSessionId());

  const handleRemoveFile = () => setPdfFile(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-64 h-40 bg-[#03C988] rounded-lg shadow-md flex flex-col items-center justify-center text-2xl font-bold cursor-pointer relative">
          <Icons.create className="mb-2 h-10 w-10 text-3xl" />
          Create a session
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow w-full sm:max-w-[450px] bg-gradient-to-b from-brand-purple to-slate-900 mx-auto">
        <div>
          <Form {...form}>
            <form
              className="space-y-4 px-6 py-4 text-[#f5f5f5]"
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
                        id="sessionName"
                        type="text"
                        placeholder="TP Algorithmique"
                        autoComplete="sessionName"
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
                          id="sessionId"
                          type="text"
                          autoComplete="sessionId"
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="showPdf"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 border-opacity-50 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Include PDF file</FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={e => {
                            field.onChange(e);
                            setShowFile(e);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {showFile && (
                <div className=" mx-auto mt-5">
                  <div className="max-w-lg mx-auto">
                    {!pdfFile && (
                      <div className="max-w-md h-40 rounded-lg border border-gray-200 border-dashed border-opacity-50 flex items-center justify-center">
                        <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                          <Icons.upload />
                          <p className="mt-3 text-white max-w-xs mx-auto">
                            Click to{' '}
                            <span className="font-medium text-indigo-600">Upload your file</span>
                          </p>
                        </label>
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          accept="application/pdf"
                          onChange={e => handleSelectedFile(e.target.files)}
                        />
                      </div>
                    )}

                    {pdfFile && (
                      <div className="mt-5 bg-white p-4 rounded shadow relative">
                        <button
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          onClick={handleRemoveFile}>
                          <Cross2Icon className="h-4 w-4" />
                        </button>

                        <p className="text-lg text-gray-500 font-semibold">{pdfFile.name}</p>
                        <p className="text-sm text-gray-500">Size: {pdfFile.size} bytes</p>

                        <div className="mt-3 bg-gray-200 rounded h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-2.5 rounded"
                            style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={showFile && !pdfFile}
                className="w-full px-4 text-white font-medium bg-brand-purple hover:bg-brand-purple-s rounded-lg duration-150">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Creating ...' : 'Create'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
