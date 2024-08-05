'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/firebase';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  toast,
} from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Your email is required' })
    .email({ message: 'Your email must contain (@) and a (.) somewhere' }),
});

const ForgotPassword = () => {
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    try {
      const res = await sendPasswordResetEmail(data.email);
      if (res) {
        toast({
          variant: 'default',
          title: 'Email sent',
          description: 'A link to reset your password has been sent your email.',
        });
        router.push('/auth/login');
        return;
      } else if (!res) {
        toast({
          variant: 'destructive',
          title: 'Email not sent',
          description: 'The password reset link could not be sent, kindly try again please',
        });
        return;
      } else if (error) {
        toast({ variant: 'destructive', title: 'Error sending email', description: error.message });
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Invalid operation',
        description: err.message,
      });
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-400 sm:max-w-md">
        <div className="bg-neutral-800 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <h3 className="text-white text-2xl font-semibold pb-3 sm:text-3xl">
            Reset your password
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 text-[#f5f5f5]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@john.doe" autoComplete="email" {...field} />
                    </FormControl>
                    <FormDescription>This is the email linked to your account.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600">
                {sending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
