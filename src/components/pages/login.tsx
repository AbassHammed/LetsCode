/* eslint-disable quotes */
'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  useToast,
} from '@components';
import { auth } from '@firebase/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs } from '@types';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
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

const loginFormSchema = z.object({
  email: z.string({ required_error: 'Please enter your username or email' }).email(),
  password: passwordSchema,
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<LoginFormValues> = {
    email: '',
    password: '',
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const handleLogin = async (inputs: LoginInputs) => {
    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        router.push('/session');
      } else if (error) {
        toast({
          variant: 'destructive',
          title: 'Invalid credentials',
          description: error.message,
        });
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Connection Error',
        description: err.message,
      });
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-400 sm:max-w-md">
        <div className="text-center">
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
          <div className="mt-5 space-y-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">Log in to your account</h3>
            <p className="">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup/"
                className="font-medium text-brand-purple-s hover:text-brand-purple">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-neutral-800 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <Form {...form}>
            <form className="space-y-4 text-[#f5f5f5]" onSubmit={form.handleSubmit(handleLogin)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@john.doe"
                        autoComplete="email"
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

              <div className="flex items-center justify-end text-sm">
                <Link
                  href="/auth/password/forgot-password"
                  className="text-center text-brand-purple-s hover:text-brand-purple">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full px-4 text-white font-medium bg-brand-purple-s hover:bg-brand-purple rounded-lg duration-150">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
