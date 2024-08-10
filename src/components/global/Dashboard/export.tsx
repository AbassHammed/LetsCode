'use client';

import { Button, Icons } from '@components';
import { CsvColumn, downloadCsv } from '@lib/csv';

const columns: CsvColumn[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'status',
    title: 'Status',
  },
  {
    key: 'joinedAt',
    title: 'Joined At',
  },
  {
    key: 'quittedAt',
    title: 'Left At',
  },
];

export default function ExportToCsv({ data }: { data: any }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 md:flex"
      onClick={() => downloadCsv(data, columns, 'Form data')}>
      <Icons.file className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
}
