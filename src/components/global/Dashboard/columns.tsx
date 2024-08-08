'use client';

import { Checkbox } from '@components';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './column-header';
import { statuses } from './data/data';
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
    accessorKey: 'connected',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find(status => status.value === row.getValue('connected'));

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'joinedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => {
      const data = row.getValue('quittedAt') as string;
      const date = new Date(data).toLocaleTimeString();
      return <div className="w-[100px]">{date}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'quittedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Disconnected" />,
    cell: ({ row }) => {
      const data = row.getValue('quittedAt') as string;
      const date = new Date(data).toLocaleTimeString();
      return <div className="w-[100px]">{date}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
