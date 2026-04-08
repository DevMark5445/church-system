import { useEffect, useRef, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

/* SVG Components */
const CrossSvg = ({ size = 20 }) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: size, height: size }}>
    <rect x="8.5" y="1" width="3" height="18" rx="1" />
    <rect x="2" y="6.5" width="16" height="3" rx="1" />
  </svg>
);

const MembersSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FinanceSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EventsSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LoginSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-headline">
      <div className="hero-glow-a" aria-hidden="true" />
      <div className="hero-glow-b" aria-hidden="true" />
      <div className="container">
        <div className="eyebrow" aria-hidden="true">
          <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)" }} />
          Church Management System
        </div>
        <h1 className="hero-headline" id="hero-headline">
          Serve Your <em>Community</em> With Clarity &amp; Care
        </h1>
        <p className="hero-sub">
          Westlands P.A.G brings your congregation together — from member records and giving history to events and communications — all in one secure, easy-to-use platform.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="btn-primary">
            <LoginSvg /> Login to Westlands P.A.G
          </Link>
        </div>
      </div>
      <svg className="hero-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 L1440,0 L1440,80 Z" />
      </svg>
    </section>
  );
}

function FeatureCard({ Icon, title, body, delay }) {
  const ref = useReveal();
  return (
    <article ref={ref} className={`feature-card reveal reveal-d${delay}`}>
      <div className="card-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{body}</p>
    </article>
  );
}

function Features() {
  const cards = [
    {
      Icon: MembersSvg,
      title: "Member Management",
      body: "Maintain a complete directory with profiles, contact details, and attendance history — searchable and easy to update.",
      delay: 1,
    },
    {
      Icon: FinanceSvg,
      title: "Financial Tracking",
      body: "Record tithes, offerings, and donations with full transparency. Generate reports and track budgets in one click.",
      delay: 2,
    },
    {
      Icon: EventsSvg,
      title: "Event Management",
      body: "Plan services and events. Track RSVPs, assign volunteers, and send reminders from one calendar view.",
      delay: 3,
    },
  ];

  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="container">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title" id="features-title">
          Everything Your Church Needs
        </h2>
        <p className="section-sub">
          Three powerful pillars designed to simplify administration so your team can focus on what truly matters.
        </p>
        <div className="features-grid">
          {cards.map((c) => <FeatureCard key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta-section" aria-labelledby="cta-headline">
      <div className="container">
        <h2 className="cta-headline" id="cta-headline">
          Ready to <em>Strengthen</em> Your Church Community?
        </h2>
        <p className="cta-sub">
          Log in now and experience a simpler way to manage your congregation, finances, and events.
        </p>
        <Link to="/login" className="btn-primary">
          <LoginSvg /> Login to Westlands P.A.G
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-logo" aria-label="Westlands P.A.G">
          <div className="footer-logo-mark" aria-hidden="true">
            <CrossSvg size={14} />
          </div>
          <span className="footer-logo-name">Westlands P.A.G</span>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Westlands P.A.G Church Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function UserProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase() || 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="user-profile-header" ref={dropdownRef}>
      <div className="user-greeting-text">
        Hello <span className="first-name">{user?.firstName || 'User'}</span>
      </div>
      
      <div style={{ position: 'relative' }}>
        <button
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="User menu"
          aria-expanded={isOpen}
          title={user?.email}
        >
          {getInitials(user?.firstName, user?.lastName)}
        </button>

        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <div className="dropdown-item">
            <span className="dropdown-item-label">Email</span>
            <div className="dropdown-item-value">{user?.email}</div>
          </div>
          
          <button
            className="logout-btn-dropdown"
            onClick={handleLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, logout, isAuthenticated, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated || isLoggedIn?.()) {
    return (
      <>
        <UserProfileDropdown user={user} onLogout={handleLogout} />
        <main style={{ paddingTop: '100px' }}>
          <Features />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <Hero />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
