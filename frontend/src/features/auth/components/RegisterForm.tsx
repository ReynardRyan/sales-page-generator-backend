import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from '@/features/auth/types/auth.types';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function RegisterForm() {
  const register_ = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => register_.mutate(data))} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
        <p className="mt-1 text-sm text-slate-500">Start generating sales pages with AI</p>
      </div>

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Repeat your password"
        error={errors.password_confirmation?.message}
        required
        {...register('password_confirmation')}
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={register_.isPending}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
