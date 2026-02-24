import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';
import App from './App.jsx';

// Register service worker; show offline-ready toast via app logic
registerSW({
  onOfflineReady() {
    // SeasonContext picks this up via a custom event
    window.dispatchEvent(new CustomEvent('pwa-offline-ready'));
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
