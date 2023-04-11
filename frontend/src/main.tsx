import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './root.css';
import { CookiesProvider } from 'react-cookie';
const rootNode = document.getElementById('app');

if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  );
}
