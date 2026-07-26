import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';
import Logo from '../../Images/Login_Page_Image/Logo_GoalTrack.PNG';
import { HiEnvelope, HiLockClosed } from 'react-icons/hi2';

const UserLogin = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="GoalTrack" className="h-16 w-auto mb-4" />
          <h1 className="text-2xl font-semibold text-text-primary tracking-wide">Welcome back</h1>
          <p className="text-text-secondary text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-surface-2 border border-border rounded-lg pl-10 pr-4 py-2.5
                    text-sm text-text-primary placeholder:text-text-muted
                    focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                    transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-surface-2 border border-border rounded-lg pl-10 pr-4 py-2.5
                    text-sm text-text-primary placeholder:text-text-muted
                    focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                    transition-colors"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-danger text-sm bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full bg-accent hover:bg-accent-dim text-bg font-semibold
                py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex flex-col gap-2 text-sm text-center text-text-secondary">
            <p>
              Forgot your password?{' '}
              <Link to="/forgot-password" className="text-accent hover:text-accent-dim transition-colors font-medium">
                Reset it
              </Link>
            </p>
            <p>
              No account?{' '}
              <Link to="/signup" className="text-accent hover:text-accent-dim transition-colors font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
