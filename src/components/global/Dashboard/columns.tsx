'use client';

import { Badge, Checkbox } from '@components';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './column-header';
import { UserType } from './data/schema';
import { DataTableRowActions } from './row-actions';

export const columns: ColumnDef<UserType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="flex w-[100px] items-center">
          <Badge variant={status === 'disconnected' ? 'destructive' : 'good'}>{status}</Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'joinedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => <div className="w-[100px]">{row.getValue('joinedAt')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'quittedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Disconnected" />,
    cell: ({ row }) => (
      <div className="w-[100px]">
        {row.getValue('quittedAt') ? row.getValue('quittedAt') : 'N/A'}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
