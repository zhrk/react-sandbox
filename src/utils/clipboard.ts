import copyToClipboard from 'copy-to-clipboard';

export const copy = (value: string | number) => copyToClipboard(String(value));
