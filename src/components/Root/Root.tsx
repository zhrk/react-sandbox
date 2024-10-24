// eslint-disable-next-line import/no-unresolved
import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import App from '../App';

const Root = () => (
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
);

export default Root;
