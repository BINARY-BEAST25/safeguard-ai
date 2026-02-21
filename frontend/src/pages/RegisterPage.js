import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authAPI.register(form);
      setDone(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-badge">Verify Account</span>
            <h1>Check your inbox</h1>
            <p>
              We sent a verification link to <strong>{form.email}</strong>. Verify your email, then sign in.
            </p>
          </div>
          <p className="auth-footnote">
            <Link to="/login">Back to login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">Parent Onboarding</span>
          <h1>Create account</h1>
          <p>Set up your sentinel dashboard for child-safe browsing and live threat tracking.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Parent name"
              required
            />
          </div>

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
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 8 characters"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footnote">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
