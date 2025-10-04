// import { useAuth } from '@/hooks/use-auth';
import { useAuth } from '@/hooks/use-auth';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/home';
import { Redirect } from 'wouter';
import { Switch, Route } from 'wouter';

export default function Router() {
  const { user } = useAuth();

  // console.log(user);
  // console.log(token);

  return (
    <Switch>
      <Route path="/dashboard">
        {user ? <Dashboard /> : <Redirect to="/" />}
      </Route>

      <Route path="/auth/:type">
        {(params) =>
          user ? <Redirect to="/dashboard" /> : <AuthPage type={params.type} />
        }
      </Route>

      {/* Root route */}
      <Route path="/">{user ? <Redirect to="/dashboard" /> : <Home />}</Route>
    </Switch>
  );
}
