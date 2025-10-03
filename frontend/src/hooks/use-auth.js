import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};
