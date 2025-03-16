import { ReactNode, useState } from 'react';

type Props = { children: ReactNode; onClick: () => void };

const YaMusicCopyLink = (props: Props) => {
  const { children, onClick } = props;

  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      disabled={copied}
      onClick={async () => {
        setCopied(true);

        await onClick();

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

export default YaMusicCopyLink;
