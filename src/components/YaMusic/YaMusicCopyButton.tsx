import { useState } from 'react';
import { filteredLikes } from './sources';

type Props = {
  emoji: string;
  children?: string;
};

const YaMusicCopyButton = (props: Props) => {
  const { emoji, children } = props;

  const [copied, setCopied] = useState(children ? filteredLikes.includes(children) : false);

  return (
    <button
      type="button"
      onClick={async () => {
        if (children && !copied) {
          await navigator.clipboard.writeText(children);

          setCopied(true);
        }
      }}
    >
      {copied ? <>✅</> : <>{emoji}</>}
    </button>
  );
};

export default YaMusicCopyButton;
