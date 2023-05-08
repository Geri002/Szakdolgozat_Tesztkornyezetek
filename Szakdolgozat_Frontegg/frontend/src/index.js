import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-17v2tipmjb6e.frontegg.com',
  clientId: 'dd506b63-e234-4add-959d-19b57e3352c7',
  redirectUrl: 'http://localhost:3000/oauth/callback'
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <App />
    </FronteggProvider>,
);