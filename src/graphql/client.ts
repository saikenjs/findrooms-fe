import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NODE_ENV==='development' ?  'http://78.142.218.131:3001/graphql' : 'https://78.142.218.131:3002/graphql' ,
  cache: new InMemoryCache(),
});
