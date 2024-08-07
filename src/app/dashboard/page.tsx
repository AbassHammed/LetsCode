import React from 'react';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { Dashboard } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: `%s | ${siteConfig.url}`,
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
