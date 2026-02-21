import React, { useMemo, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/', label: 'Overview', exact: true, marker: '01' },
  { path: '/children', label: 'Children', marker: '02' },
  { path: '/activity', label: 'Activity', marker: '03' },
  { path: '/analytics', label: 'Analytics', marker: '04' },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const todayLabel = useMemo(
    () => new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    []
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className={`app-shell ${sidebarOpen ? '' : 'is-collapsed'} ${mobileNavOpen ? 'is-mobile-open' : ''}`}>
      <button
        className="mobile-backdrop"
        type="button"
        onClick={closeMobileNav}
        aria-label="Close navigation"
      />

      <aside className="app-sidebar">
        <div className="app-sidebar-header">
          <div className="brand-mark">PG</div>
          {sidebarOpen && (
            <div className="brand-copy">
              <strong>PhishGuard Sentinel</strong>
              <span>Defense Control</span>
            </div>
          )}
        </div>

        <nav className="app-nav">
          {navItems.map(({ path, label, exact, marker }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) => `app-nav-item ${isActive ? 'is-active' : ''}`}
              onClick={closeMobileNav}
            >
              <span className="app-nav-marker">{marker}</span>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          {sidebarOpen && (
            <div className="sidebar-user">
              <span className="sidebar-user-label">Parent Session</span>
              <strong>{user?.name || 'Guardian'}</strong>
            </div>
          )}
          <button type="button" className="btn btn-secondary sidebar-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <span />
            <span />
            <span />
          </button>

          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Open navigation"
          >
            Menu
          </button>

          <div className="topbar-copy">
            <p>Threat shield active</p>
            <h1>Welcome back, {user?.name || 'Guardian'}</h1>
          </div>

          <div className="topbar-meta">
            <span>{todayLabel}</span>
          </div>
        </header>

        <section className="app-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
