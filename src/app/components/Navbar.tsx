import {  Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

const LOGO_IMAGE = '/logo.png';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollItems = [
    { label: 'Home', href: '#home' },

    { label: 'Pet Care', href: '#pet-care' },
  ];

  const handleScrollNav = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToAnchor(href), 300);
    } else {
      scrollToAnchor(href);
    }
    setMobileMenuOpen(false);
  };

  const scrollToAnchor = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleCommunity = () => {
    navigate('/community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleAdopt = () => {
    navigate('/adopt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleVolunteer = () => {
    navigate('/volunteer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isCommunity = location.pathname === '/community';
  const isAdopt = location.pathname === '/adopt';
  const isVolunteer = location.pathname === '/volunteer';

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(8px);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
        }
        
.navbar-logo-img-wrap {
 width: 40px;

}

        .navbar-logo-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #3A2E2A;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .navbar-links button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          color: #3A2E2A;
          transition: color 0.2s;
          padding: 0;
        }
        .navbar-links button:hover,
        .navbar-links button.active {
          color: #FF914D;
        }

        .navbar-cta {
          background-color: #FF914D;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 12px 24px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.2s, box-shadow 0.2s;
        }
        .navbar-cta:hover {
          background-color: #FF7A2E;
          box-shadow: 0 4px 12px rgba(255,145,77,0.4);
        }
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #3A2E2A;
          padding: 6px;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 0 24px 16px;
        }
        .mobile-menu button {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          color: #3A2E2A;
          text-align: left;
          padding: 10px 4px;
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: #FF914D; }
        .mobile-menu button.active { color: #FF914D; }
        .mobile-menu .navbar-cta {
          width: 100%;
          margin-top: 8px;
        }
        @media (max-width: 1024px) {
          .navbar-links, .navbar-cta-wrap { display: none; }
          .navbar-hamburger { display: block; }
          .mobile-menu.open { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <button className="navbar-logo" onClick={() => handleScrollNav('#home')}>
           
           <div className="navbar-logo-img-wrap">
  <img src={LOGO_IMAGE} alt="AnbuFur logo" />
</div>
            <span className="navbar-logo-text">AnbuFur</span>
          </button>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {scrollItems.map((item) => (
              <li key={item.label}>
                <button onClick={() => handleScrollNav(item.href)}>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                className={isAdopt ? 'active' : ''}
                onClick={handleAdopt}
              >
                Adopt
              </button>
            </li>
            <li>
              <button
                className={isCommunity ? 'active' : ''}
                onClick={handleCommunity}
              >
                Community
              </button>
            </li>
            <li>
              <button
                className={isVolunteer ? 'active' : ''}
                onClick={handleVolunteer}
              >
                Volunteer
              </button>
            </li>
          </ul>

          {/* CTA */}
          <div className="navbar-cta-wrap">
            <button className="navbar-cta" onClick={() => handleScrollNav('#donate')}>
              Donate
            </button>
          </div>

          {/* Hamburger */}
          <button className="navbar-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {scrollItems.map((item) => (
            <button key={item.label} onClick={() => handleScrollNav(item.href)}>
              {item.label}
            </button>
          ))}
          <button className={isAdopt ? 'active' : ''} onClick={handleAdopt}>
            Adopt
          </button>
          <button className={isCommunity ? 'active' : ''} onClick={handleCommunity}>
            Community
          </button>
          <button className={isVolunteer ? 'active' : ''} onClick={handleVolunteer}>
            Volunteer
          </button>
          <button className="navbar-cta" onClick={() => handleScrollNav('#donate')}>
            Donate
          </button>
        </div>
      </nav>
    </>
  );
}