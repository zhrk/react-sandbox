import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { filteredLikes } from './ids';
import likes from './music/likes.json';
import styles from './styles.module.scss';
import YaMusicCopyButton from './YaMusicCopyButton';

let jsonData: (
  | {
      id: string;
      link: string;
      timestamp: string;
      title: string;
      type: string;
      name?: undefined;
    }
  | {
      id: string;
      link: string;
      name: string;
      timestamp: string;
      type: string;
      title?: undefined;
    }
)[] = likes;

jsonData = jsonData
  .filter((item) => item.type !== 'album' && item.type !== 'artist')
  .filter((item) => !filteredLikes.includes(item.id));

const columnHelper = createColumnHelper<(typeof jsonData)[number]>();

const columns = [
  columnHelper.accessor((data) => data.id, {
    id: 'action',
    header: '',
    cell: (data) => <YaMusicCopyButton>{data.row.original.id}</YaMusicCopyButton>,
  }),
  columnHelper.accessor((data) => data.title, {
    id: 'title',
    header: 'Name',
    cell: (info) => (
      <a target="_blank" rel="noreferrer" href={`https://music.yandex.ru${info.row.original.link}`}>
        {info.getValue()}
      </a>
    ),
    footer: (props) => props.table.getRowCount(),
  }),
  columnHelper.accessor((data) => new Date(data.timestamp).toLocaleDateString(), {
    id: 'timestamp',
    header: 'Date',
  }),
];

const YaMusic = () => {
  const [data, _setData] = useState(() => [...jsonData]);

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

export default YaMusic;
