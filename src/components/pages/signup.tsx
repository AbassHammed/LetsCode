/* eslint-disable quotes */
'use client';

import { useState } from 'react';

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
import { auth, firestore } from '@firebase/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupInputs } from '@types';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Your password must have at least 8 characters.' })
  .max(20, { message: "Your password can't have more than 20 characters" })
  .refine(password => /[A-Z]/.test(password), {
    message: 'Your password must contain at least an uppercase character.',
  })
  .refine(password => /[a-z]/.test(password), {
    message: 'Your password must have at least a lowercase character.',
  })
  .refine(password => /[0-9]/.test(password), {
    message: 'You must have a numeric character in your password.',
  })
  .refine(password => /[!@#$%^&*]/.test(password), {
    message: "You can't have a password without at least a special character",
  });

const FormSchema = z
  .object({
    fullName: z.string({ message: 'Please enter your fullname' }).min(5).max(30),
    email: z.string().email({ message: 'Your email must include @ and a . somewhere' }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const { toast } = useToast();
  const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const defaultValues: Partial<FormValues> = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const handleSignUp = async (inputs: SignupInputs) => {
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        await setDoc(doc(firestore, 'users', newUser.user.uid), {
          uid: newUser.user.uid,
          fullName: inputs.fullName,
          email: newUser.user.email,
          createdAt: serverTimestamp(),
        });
        router.push('/session');
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Invalid credentials',
        description: err.message,
      });
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-400 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-white text-2xl font-bold sm:text-3xl">Create an account</h3>
            <p className="">
              Have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-brand-purple-s hover:text-brand-purple">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-neutral-800 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <Form {...form}>
            <form className="space-y-8 text-[#f5f5f5]" onSubmit={form.handleSubmit(handleSignUp)}>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">FullName</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        autoComplete="fullName"
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

              <FormField
                control={form.control}
                name="confirmPassword"
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

              <Button className="w-full px-4 text-white font-medium bg-brand-purple-s hover:bg-brand-purple rounded-lg duration-150">
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
