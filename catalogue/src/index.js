import React from 'react';
import { createRoot } from 'react-dom/client';
import Catalogue from './Catalogue';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Catalogue />
  </React.StrictMode>
); 