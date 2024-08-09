'use client';

import { Button, Icons } from '@components';

export default function ExportToCsv() {
  return (
    <Button variant="outline" size="sm" className="ml-auto hidden h-8 md:flex">
      <Icons.file className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
}
