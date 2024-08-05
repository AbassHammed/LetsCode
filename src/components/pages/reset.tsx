/* eslint-disable quotes */
'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { auth } from '@/firebase/firebase';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  toast,
} from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPasswordReset } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import IconImage from '../../../public/Icon.png';

const passwordSchema = z
  .string()
  .min(8, { message: 'Your password has at least 8 characters.' })
  .max(20, { message: "Your password can't have more than 20 characters" })
  .refine(password => /[A-Z]/.test(password), {
    message: 'Your password definitely contains at least an uppercase character.',
  })
  .refine(password => /[a-z]/.test(password), {
    message: 'Your password also contains at least a lowercase character.',
  })
  .refine(password => /[0-9]/.test(password), {
    message: 'There must have been a numeric character in your password.',
  })
  .refine(password => /[!@#$%^&*]/.test(password), {
    message: "You can't have a password without at least a special character",
  });

const FormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z.string({ required_error: 'Password confirmation is required' }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  });

const ResetPassword = () => {
  const router = useRouter();
  const oobCode = useSearchParams().get('oobCode')!;
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const handlePasswordReset = async (data: { password: string; passwordConfirmation: string }) => {
    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      router.push('/auth/login');
      return;
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Invalid operation',
        description: err.message,
      });
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-400 sm:max-w-lg">
        <div className="flex flex-col items-center">
          <Image
            src={IconImage}
            alt="LetsCode Logo"
            width={100}
            height={100}
            quality={95}
            priority
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
          <h1 className="fonth1 ml-2">LetsCode</h1>
        </div>
        <div className="bg-neutral-800 shadow p-4 py-6 sm:p-6 mx-4 rounded-lg">
          <h3 className="text-white text-2xl font-semibold pb-3 sm:text-3xl">
            Reset your password
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePasswordReset)}
              className="space-y-6 text-[#f5f5f5]">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <button
                          type="button"
                          className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                          onClick={() => setPasswordHidden(!isPasswordHidden)}>
                          {isPasswordHidden ? <Icons.eye /> : <Icons.eyesplash />}
                        </button>
                        <Input
                          placeholder="********"
                          type={isPasswordHidden ? 'password' : 'text'}
                          autoComplete="current-password"
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <button
                          type="button"
                          className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                          onClick={() => setPasswordHidden(!isPasswordHidden)}>
                          {isPasswordHidden ? <Icons.eye /> : <Icons.eyesplash />}
                        </button>
                        <Input
                          placeholder="********"
                          type={isPasswordHidden ? 'password' : 'text'}
                          autoComplete="current-password"
                          {...field}
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
                className="text-white font-medium bg-brand-purple hover:bg-brand-purple-s">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};
export default ResetPassword;
