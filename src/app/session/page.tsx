import React from 'react';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { Session } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Session',
    template: `%s | ${siteConfig.url}`,
  },
};

const SessionPage = () => <Session />;
export default SessionPage;
