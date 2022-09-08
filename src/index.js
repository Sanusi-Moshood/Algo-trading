import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Account } from './context/Account';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Account>
    <App />
    </Account>

);

