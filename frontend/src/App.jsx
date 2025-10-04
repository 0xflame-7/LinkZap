import React from 'react';
import AuthProvider from './provider/AuthProvider';
import Router from './routes/routes';
import { ToastProvider } from './provider/toastProvider';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider />
      <Router />
    </AuthProvider>
  );
}
