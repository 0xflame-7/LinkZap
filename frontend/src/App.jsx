import React from 'react';
import { Button } from './components/ui/button';
import Home from './pages/home';
import AuthPage from './pages/AuthPage';
import AuthProvider from './provider/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
