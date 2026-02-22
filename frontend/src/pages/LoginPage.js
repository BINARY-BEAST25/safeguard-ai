import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.email.trim();
    if (!email) {
      toast.error('Enter your email first');
      return;
    }

    setForgotLoading(true);
    try {
      const res = await authAPI.forgotPassword(email);
      toast.success(res.data?.message || 'If that email exists, a reset link was sent.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not send reset email');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">Sentinel Access</span>
          <h1>PhishGuard Sentinel</h1>
          <p>Sign in to monitor threats, children activity, and safety alerts in real time.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="parent@domain.com"
              required
            />
          </div>

          <div className="form-group">
            <div className="password-row">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="auth-link-btn"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
              >
                {forgotLoading ? 'Sending...' : 'Forgot password?'}
              </button>
            </div>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control password-input"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footnote">
          No account yet? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
