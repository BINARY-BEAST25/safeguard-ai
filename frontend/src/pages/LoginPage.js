import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
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
