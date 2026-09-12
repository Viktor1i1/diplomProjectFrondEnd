import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux';
import {store} from "./store/store.js";
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
)
