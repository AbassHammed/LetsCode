import { Metadata } from 'next';

import { siteConfig } from '@config/site';
import { ForgotPassword } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Forgot Password',
    template: `%s - ${siteConfig.url}`,
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
