'use client';

import { Input } from '@components';
import { Table } from '@tanstack/react-table';

import ExportToCsv from './export';
import { DataTableViewOptions } from './view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function DataTableToolbar<TData>({ table, data }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center justify-between flex-row space-x-2">
        <ExportToCsv data={data} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
