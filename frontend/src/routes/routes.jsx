// import { useAuth } from '@/hooks/use-auth';
import AuthPage from '@/pages/AuthPage';
import Home from '@/pages/home';
import { Switch, Route } from 'wouter';

export default function Router() {
  // const { user, , token } = useAuth();

  return (
    <Switch>
      <Route path="/auth/:type">
        {(params) => <AuthPage type={params.type} />}
      </Route>
      <Route path="/" component={Home} />
    </Switch>
  );
}
