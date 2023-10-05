import { Client } from '@hyper-fetch/core';
import { useFetch } from '@hyper-fetch/react';

const client = new Client({ url: 'https://jsonplaceholder.typicode.com' });

type Response = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const getPosts = client.createRequest<Response[]>()({
  method: 'GET',
  endpoint: '/posts',
});

const HyperFetch = () => {
  const { data, loading } = useFetch(getPosts.setQueryParams({ _limit: 10 }));

  if (loading) return <div>Loading...</div>;
  if (!data) return null;

  // data null из-за этого нельзя по дефолту сделать []
  // в целом такой же принцип с отдельными файлами для каждого запроса, это не единый api-клиент

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default HyperFetch;
