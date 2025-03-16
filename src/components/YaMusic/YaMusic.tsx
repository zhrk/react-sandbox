import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '../TanStackTable';
import { filteredLikes, likes } from './sources';
import YaMusicCopyButton from './YaMusicCopyButton';
import YaMusicCopyLink from './YaMusicCopyLink';

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
    cell: (data) => (
      <div>
        <YaMusicCopyButton emoji="📑">{data.row.original.id}</YaMusicCopyButton>
        <YaMusicCopyButton emoji="🔤">{data.row.original.name}</YaMusicCopyButton>
      </div>
    ),
  }),
  columnHelper.accessor((data) => data.title, {
    id: 'title',
    header: 'Name',
    cell: (info) => (
      <a target="_blank" rel="noreferrer" href={`https://music.yandex.ru${info.row.original.link}`}>
        {info.getValue()}
      </a>
    ),
    footer: (props) => {
      const count = props.table.getRowCount();

      if (!count) return null;

      return (
        <div>
          <YaMusicCopyLink
            onClick={() =>
              navigator.clipboard.writeText(
                'yt-dlp --cookies-from-browser firefox --embed-thumbnail --embed-metadata'
              )
            }
          >
            Download link ({props.table.getRowCount()})
          </YaMusicCopyLink>
        </div>
      );
    },
  }),
  columnHelper.accessor((data) => new Date(data.timestamp).toLocaleDateString(), {
    id: 'timestamp',
    header: 'Date',
  }),
];

const YaMusic = () => <Table data={jsonData} columns={columns} />;

export default YaMusic;
