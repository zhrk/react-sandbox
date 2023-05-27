import { useStore } from '@nanostores/react';
import { createRouter } from '@nanostores/router';

const test = {
  home: '/',
  news: '/news',
  article: '/news/:articleId',
  contacts: '/contacts',
} as const;

const routerConfig = createRouter(test);

export const useRouter = () => {
  const router = useStore(routerConfig);

  if (!router) throw new Error();

  return { router };
};
