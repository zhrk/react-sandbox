/* eslint-disable react/destructuring-assignment */

import { randFirstName, randLastName, randNumber, randUuid } from '@ngneat/falso';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import styles from './styles.module.scss';

// https://github.com/TanStack/table/issues/4382
// ^ ColumnDef<T, any>, мб пофиксисят и можно просто ColumnDef<T>

type Props<T> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
};

export const Table = <T,>(props: Props<T>) => {
  const { columns } = props;

  const [data] = useState(() => [...props.data]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className={styles.container}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

const fakeData = Array.from({ length: 25 }).map(() => ({
  id: randUuid(),
  firstName: randFirstName(),
  lastName: randLastName(),
  age: randNumber({ min: 1, max: 99 }),
}));

const columnHelper = createColumnHelper<(typeof fakeData)[number]>();

const columns = [
  columnHelper.accessor((data) => data.firstName, {
    header: 'firstName',
  }),
  columnHelper.accessor((data) => data.lastName, {
    header: 'lastName',
  }),
  columnHelper.accessor((data) => data.age, {
    header: 'age',
  }),
];

const TanStackTable = () => <Table data={fakeData} columns={columns} />;

export default TanStackTable;
