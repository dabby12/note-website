import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://edd4919963ac36fef8af9a361282277a@o4509070019788800.ingest.us.sentry.io/4509070024507392"
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
