import { Metadata } from 'next';

import { siteConfig } from '@config/site';
import { SignUpForm } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Sign up',
    template: `%s - ${siteConfig.url}`,
  },
};

export default function SigupPage() {
  return <SignUpForm />;
}
