import { ApolloClient, InMemoryCache } from '@apollo/client';
import { subgraphUrl } from '@/config';

// create apollo client
const client = new ApolloClient({
    uri: subgraphUrl,
    cache: new InMemoryCache(),
  });

  export default client;