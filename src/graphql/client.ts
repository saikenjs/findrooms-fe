import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://78.142.218.131:3001/graphql',
  cache: new InMemoryCache(),
});
