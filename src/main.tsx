import { ApolloProvider } from '@apollo/client';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import 'antd/dist/antd.css';
import '~/main.css';

import { client } from '~/graphql/client';
import { Routes } from '~/routes';

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </RecoilRoot>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
