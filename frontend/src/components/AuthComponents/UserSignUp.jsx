import React, { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import { Link } from 'react-router-dom';
import Logo from '../../Images/Login_Page_Image/Logo_GoalTrack.PNG';
import { HiEnvelope, HiLockClosed, HiUser } from 'react-icons/hi2';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="GoalTrack" className="h-16 w-auto mb-4" />
          <h1 className="text-2xl font-semibold text-text-primary tracking-wide">Create an account</h1>
          <p className="text-text-secondary text-sm mt-1">Start tracking your goals today</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                Name
              </label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-surface-2 border border-border rounded-lg pl-10 pr-4 py-2.5
                    text-sm text-text-primary placeholder:text-text-muted
                    focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                    transition-colors"
                />
              </div>
            </div>

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
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-text-secondary">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:text-accent-dim transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
