import { Metadata } from 'next';

import { siteConfig } from '@config/site';
import { Login } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Login',
    template: `%s - ${siteConfig.url}`,
  },
};

export default function LoginPage() {
  return <Login />;
}
