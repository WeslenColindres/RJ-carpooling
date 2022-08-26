import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './firebase-config';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    celeste: {
      main: '#d7ecf1',
      light: '#beecf0',
      dark: '#055669',
      contrastText: '#00b2bb',
    },
    blanco:{
      main: 'white'
    }
  }
})

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <ThemeProvider theme={theme}>
      <App />
    </ ThemeProvider>
  </FirebaseAppProvider>
);

reportWebVitals();
