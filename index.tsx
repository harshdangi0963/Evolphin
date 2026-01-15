
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Nexus KM: Initializing Application...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Nexus KM Error: Root element '#root' not found in document.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Nexus KM: Render complete.");
  } catch (err) {
    console.error("Nexus KM Runtime Error during render:", err);
  }
}
