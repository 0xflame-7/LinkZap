import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      Dashboard
      <Button onClick={logout}>logout</Button>
    </div>
  );
}
