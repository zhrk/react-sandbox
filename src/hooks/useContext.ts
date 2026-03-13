import { Context, useContext as useContextReact } from 'react';
import { assert } from '../utils';

const useContext = <T>(ctx: Context<T>) => {
  const context = useContextReact(ctx);

  assert(context, `useContext hook must be used within a <Context />`);

  return context;
};

export default useContext;
