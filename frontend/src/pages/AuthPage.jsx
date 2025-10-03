import LogicForm from '@/components/auth/LogicForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthPage({ type }) {
  const isLogin = type === 'login';

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {isLogin ? <LogicForm /> : <RegisterForm />}
    </div>
  );
}
