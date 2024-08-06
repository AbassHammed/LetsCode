import { Dispatch, SetStateAction } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

export type TernaryDarkMode = 'system' | 'dark' | 'light';

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
}
