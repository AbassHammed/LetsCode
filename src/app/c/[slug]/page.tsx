import React from 'react';

import { Metadata } from 'next';

import { siteConfig } from '@config/site';
import { Compiler } from '@pages';

export const metadata: Metadata = {
  title: {
    default: 'Compiler',
    template: `%s - ${siteConfig.url}`,
  },
};

const CompilerPage = () => <Compiler />;
export default CompilerPage;
