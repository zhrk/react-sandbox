import { createColumnHelper } from '@tanstack/react-table';
import copy from 'copy-to-clipboard';
import { ReactNode, useState } from 'react';
import { Table } from '../TanStackTable';
import { filteredLikes, likes } from './sources';
import YaMusicCopyButton from './YaMusicCopyButton';

const CopyLink = (props: { children: ReactNode; onClick: () => void }) => {
  const { children, onClick } = props;

  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      disabled={copied}
      onClick={() => {
        setCopied(true);

        onClick();

        if (!copied) {
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }
      }}
    >
      {copied ? 'Copied!' : children}
    </button>
  );
};

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

// const originalArray = jsonData;

jsonData = jsonData
  .filter((item) => item.type !== 'album' && item.type !== 'artist')
  .filter((item) => !filteredLikes.includes(item.id));

// const unliked = filteredLikes.filter((x) => !originalArray.map((item) => item.id).includes(x));

// console.log(unliked);

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
    footer: (props) => (
      <div>
        <CopyLink
          onClick={() =>
            copy('yt-dlp --cookies-from-browser firefox --embed-thumbnail --embed-metadata ')
          }
        >
          Download link ({props.table.getRowCount()})
        </CopyLink>
      </div>
    ),
  }),
  columnHelper.accessor((data) => new Date(data.timestamp).toLocaleDateString(), {
    id: 'timestamp',
    header: 'Date',
  }),
];

const YaMusic = () => <Table data={jsonData} columns={columns} />;

export default YaMusic;
