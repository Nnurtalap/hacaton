import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserfrontProvider } from '@userfront/react';
const tenantId = import.meta.env.VITE_USERFRONT_TENANT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserfrontProvider tenantId={tenantId}>
        <App />
      </UserfrontProvider>
    </Provider>
  </StrictMode>,
);
