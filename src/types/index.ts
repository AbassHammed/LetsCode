import { Dispatch, SetStateAction } from 'react';

import { Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { z } from 'zod';

export type TernaryDarkMode = 'system' | 'dark' | 'light';

export type SettingsNav = 'editor' | 'shortcuts' | 'advanced';

export type TernaryDarkModeOptions = {
  defaultValue?: TernaryDarkMode;
  localStorageKey?: string;
  initializeWithValue?: boolean;
};

export type TernaryDarkModeReturn = {
  isDarkMode: boolean;
  ternaryDarkMode: TernaryDarkMode;
  setTernaryDarkMode: Dispatch<SetStateAction<TernaryDarkMode>>;
  toggleTernaryDarkMode: () => void;
};

export type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

export type UseLocalStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    githubUsername: string;
    authorSite: string;
  };
};

export type SignupInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type UseAuthReturnType = {
  user: ReturnType<typeof useAuthState>[0];
  loading: ReturnType<typeof useAuthState>[1];
};

export interface SessionData {
  filePath?: string;
  sessionName?: string;
  sessionDocId?: string;
  showPdfFile?: boolean;
}

export type Session = {
  filePath: string | null;
  sessionId: string;
  sessionName: string;
  showPdfFile: boolean;
  showWhenJoined: boolean;
  createdAt: Timestamp;
  userId: string;
};

export const userSchema = z.object({
  id: z.string(),
  sessionDocId: z.string(),
  name: z.string(),
  status: z.string(),
  joinedAt: z.string(),
  quittedAt: z.string().nullable(),
});

export type UserType = z.infer<typeof userSchema>;
