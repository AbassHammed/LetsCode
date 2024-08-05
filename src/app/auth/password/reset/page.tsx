import { Metadata } from 'next';

import { siteConfig } from '@config/site';
import { ResetPassword } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Reset Password',
    template: `%s | ${siteConfig.url}`,
  },
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
