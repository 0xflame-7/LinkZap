import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function AuthPage() {
  const { login, register, logout, user } = useAuth();

  return <h1>Hello</h1>;
}
