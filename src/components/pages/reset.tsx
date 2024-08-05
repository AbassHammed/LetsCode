/* eslint-disable quotes */
'use client';

import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/firebase';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // Icons,
  Input,
  toast,
} from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPasswordReset } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
      await confirmPasswordReset(auth, '', data.password);
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
      <div className="w-full space-y-6 text-gray-400 sm:max-w-md">
        <div className="bg-neutral-800 shadow p-4 py-6 sm:p-6 sm:rounded-lg">
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
                    <FormLabel className="text-white">New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
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
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm new password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        autoComplete="current-password"
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
                className="text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600">
                {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
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
