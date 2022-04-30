import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import 'antd/dist/antd.css';
import '~/main.css';

import { Routes } from '~/routes';

render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
