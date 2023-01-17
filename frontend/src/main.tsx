import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './root.css';
const rootNode = document.getElementById('app');
//teste
if (rootNode) {
  createRoot(rootNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
